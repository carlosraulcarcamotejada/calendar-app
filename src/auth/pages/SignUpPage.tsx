import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AuthLayout, SignUpValues } from "../";
import { FormikProps, useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

const initialValues: SignUpValues = {
  email: "",
  password: "",
  confirmpassword: "",
  name: "",
  lastname: "",
};

const formValidations = {
  name: Yup.string()
    .min(3, "Mínimo 3 caracteres.")
    .max(40, "Máximo 40 caracteres.")
    .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras para el nombre.")
    .required("Nombre es requerido."),
  lastname: Yup.string()
    .min(3, "Mínimo 3 caracteres.")
    .max(40, "Máximo 40 caracteres.")
    .matches(/^[aA-zZ\s]+$/, "Sólo se permiten letras para el nombre.")
    .required("Apellido es requerido."),
  email: Yup.string()
    .email("Debe ser un email válido.")
    .required("Correo es requerido."),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .max(12, "Máximo 12 caracteres")
    .required("Contraseña es requerida.")
    .matches(
      /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
      "Debe contener al menos un caracter especial"
    )
    .matches(/^(?=.*[A-Z])/, "Debe contener al menos un carácter en mayúscula.")
    .matches(/^(?=.*[a-z])/, "Debe contener al menos un carácter en Minúscula.")
    .matches(/^(?=.*[0-9])/, "Debe contener al menos un número."),
  confirmpassword: Yup.string()
    .required("Contraseña de confirmación es requerida.")
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden."),
};

export const SignUpPage: FC = (): JSX.Element => {
  const onSubmit = (values: SignUpValues) => {
    console.log(values);
    formik.resetForm();
  };

  const formik: FormikProps<SignUpValues> = useFormik<SignUpValues>({
    initialValues,
    validationSchema: Yup.object(formValidations),
    onSubmit,
  });

  return (
    <AuthLayout title="Registro">
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              fullWidth
              label="Nombres"
              onBlur={formik.handleBlur}
              error={!!formik.errors.name && formik.touched.name}
              helperText={
                !!formik.errors.name &&
                formik.touched.name &&
                formik.errors.name
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellidos"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.lastname && formik.touched.lastname}
              helperText={
                !!formik.errors.lastname &&
                formik.touched.lastname &&
                formik.errors.lastname
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                !!formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              onChange={formik.handleChange}
              label="Contraseña"
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={!!formik.errors.password && formik.touched.password}
              helperText={
                !!formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
            />
            <TextField
              fullWidth
              name="confirmpassword"
              onChange={formik.handleChange}
              label="Confirmar contraseña"
              type="password"
              margin="normal"
              value={formik.values.confirmpassword}
              onBlur={formik.handleBlur}
              error={
                !!formik.errors.confirmpassword &&
                formik.touched.confirmpassword
              }
              helperText={
                !!formik.errors.confirmpassword &&
                formik.touched.confirmpassword &&
                formik.errors.confirmpassword
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Registrarse
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/auth/signin" variant="body2">
              ¿Ya tienes una cuenta? Iniciar sesión
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
