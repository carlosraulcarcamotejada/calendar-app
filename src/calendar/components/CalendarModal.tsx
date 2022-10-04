import { FC, useState, useEffect, forwardRef } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addHours } from "date-fns";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import "dayjs/locale/es";
import { useCalendarStore, useUiStore } from "../../hooks";
import { ModalForm } from "../../auth/interafces";
import { TransitionProps } from "@mui/material/transitions";

const initialValues: ModalForm = {
  start: new Date().toDateString(),
  end: addHours(new Date(), 1).toDateString(),
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

export const CalendarModal: FC = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();

  const onSubmit = async (values: ModalForm) => {
    console.log(values);

    await startSavingEvent({
      ...formik.values,
      bgColor: "",
      user: {
        _id: 123,
        name: "carlos",
      },
    });

    formik.resetForm();
    closeDateModal();
  };

  const formik: FormikProps<ModalForm> = useFormik<ModalForm>({
    initialValues,
    validationSchema: Yup.object(formValidations),
    onSubmit,
  });

  const handleDateChange = (value: any | null, target: string) => {
    formik.setFieldValue(target, value.$d);
    // dateValidator();
  };

  useEffect(() => {
    if (activeEvent) formik.setValues({ ...activeEvent });
  }, [activeEvent]);

  return (
    <Dialog
      open={isDateModalOpen}
      onClose={() => {
        closeDateModal();
        setActiveEvent(null);
      }}
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
              <Alert sx={{ marginX: 2 }} severity="error">
                {errorMessage}
              </Alert>
            )}
            <Button
              sx={{ marginX: 2 }}
              disabled={
                errorMessage.length > 0 || !formik.isValid || !formik.dirty
              }
              type="submit"
              startIcon={<Save />}
              variant="outlined"
            >
              Guardar
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
