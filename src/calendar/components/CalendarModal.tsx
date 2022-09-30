import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addHours } from "date-fns";
import { FormikProps, useFormik } from "formik";

type props = {
  isOpen: boolean;
  handleClose: () => void;
};

const initialValues =  {
    start: new Date(),
    end: addHours(new Date(), 2),
    title: "",
    notes: "",
  }

export const CalendarModal: FC<props> = ({
  isOpen,
  handleClose,
}): JSX.Element => {




  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };



  const formik: FormikProps<typeof initialValues> = useFormik<typeof initialValues>({
    initialValues,
    onSubmit,
  });


  const handleDateChange = (value: Date | null, target: string) => {
    formik.setFieldValue(target,value);
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Fecha y hora de inicio"
                value={formik.values.start}
                minDate={new Date()}
                onChange={(e) => handleDateChange(e, "start")}
                renderInput={(params) => (
                  <TextField margin="normal" fullWidth {...params} />
                )}
              />
              <DateTimePicker
                label="Fecha y hora de finalización"
                value={formik.values.end}
                minDate={formik.values.start}
                onChange={(e) => handleDateChange(e, "end")}
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
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            startIcon={<Save />}
            onClick={handleClose}
            variant="outlined"
          >
            Guardar
          </Button>
        </DialogActions>
        </Box>

    </Dialog>
  );
};
