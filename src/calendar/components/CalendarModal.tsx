import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addHours, differenceInSeconds } from "date-fns";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import "dayjs/locale/es";

type props = {
  isOpen: boolean;
  handleClose: () => void;
};

const initialValues = {
  start: new Date(),
  end: addHours(new Date(), 1),
  title: "",
  notes: "",
};

const formValidations = {
  title: Yup.string()
    .required("Título es requerido.")
    .min(1, "Mínimo 1 caracteres.")
    .max(30, "Máximo 30 caracteres."),
  notes: Yup.string()
    .required("Notas es requerido.")
    .min(1, "Mínimo 1 caracteres.")
    .max(100, "Máximo 100 caracteres."),
};

export const CalendarModal: FC<props> = ({
  isOpen,
  handleClose,
}): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (values: typeof initialValues) => {
    //console.log(values);

    console.log(formik.values.start);
    console.log(formik.values.end);

    // const difference = differenceInSeconds(
    //   formik.values.end,
    //   formik.values.start
    // );

    // console.log("llega");
    // setErrorMessage("");
    // console.log({ difference });
    // console.log({ errorMessage });
    // if (isNaN(difference) || difference <= 0) {
    //   setErrorMessage(
    //     "Error en las fechas, la fecha de finalización no puede ser menor o igual a la fecha de inicio."
    //   );
    //   // console.log(errorMessage);
    //   return;
    // }

    //formik.resetForm();
    //handleClose();
  };

  const formik: FormikProps<typeof initialValues> = useFormik<
    typeof initialValues
  >({
    initialValues,
    validationSchema: Yup.object(formValidations),
    onSubmit,
  });

  const handleDateChange = (value: Date | null, target: string) => {
    console.log({value});
    formik.setFieldValue(target, value, true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="alert-dialog-title">Nuevo evento</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Box>
            <LocalizationProvider
              adapterLocale={"es"}
              dateAdapter={AdapterDayjs}
            >
              <DateTimePicker
                label="Fecha y hora de inicio"
                value={formik.values.start}
                minDate={new Date()}
                onChange={(date) => handleDateChange(date, "start")}
                renderInput={(params) => (
                  <TextField
                    onBlur={formik.handleBlur}
                    margin="normal"
                    fullWidth
                    {...params}
                  />
                )}
              />
              <DateTimePicker
                label="Fecha y hora de finalización"
                value={formik.values.end}
                minDate={formik.values.start}
                onChange={(date) => handleDateChange(date, "end")}
                renderInput={(params) => (
                  <TextField margin="normal" fullWidth {...params} />
                )}
              />
            </LocalizationProvider>
            <TextField
              name="title"
              label="Título"
              variant="outlined"
              margin="normal"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              error={!!formik.errors.title && formik.touched.title}
              helperText={
                !!formik.errors.title &&
                formik.touched.title &&
                formik.errors.title
              }
            />
            <TextField
              name="notes"
              label="Notas"
              multiline
              rows={4}
              onChange={formik.handleChange}
              value={formik.values.notes}
              fullWidth
              margin="normal"
              onBlur={formik.handleBlur}
              error={!!formik.errors.notes && formik.touched.notes}
              helperText={
                !!formik.errors.notes &&
                formik.touched.notes &&
                formik.errors.notes
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box>
            {errorMessage.length > 0 && (
              <Alert severity="error">{errorMessage}</Alert>
            )}

            <Button type="submit" startIcon={<Save />} variant="outlined">
              Guardar
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
