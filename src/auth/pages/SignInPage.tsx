import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AuthLayout, SignInValues } from "../";
import { FormikProps, useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useAuthStore } from "../../hooks";
import { Alert } from "@mui/material";

const initialValues: SignInValues = {
  email: "carlosraulcarcamotejada@gmail.com",
  password: "Bunbury88$",
};

const formValidations = {
  email: Yup.string()
    .email("Debe ser un email válido.")
    .required("Correo es requerido."),
  password: Yup.string().required("Contraseña es requerida."),
};

export const SignInPage: FC = (): JSX.Element => {


  const { startLogin, isError, errorMessage } = useAuthStore();

  const onSubmit = (values: SignInValues) => {
    startLogin(values);
    //formik.resetForm();
  };

  const formik: FormikProps<SignInValues> = useFormik<SignInValues>({
    initialValues,
    validationSchema: Yup.object(formValidations),
    onSubmit,
  });

  return (
    <AuthLayout title="Ingreso">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo Electrónico"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          autoComplete="email"
          autoFocus
          onBlur={formik.handleBlur}
          error={!!formik.errors.email && formik.touched.email}
          helperText={
            !!formik.errors.email && formik.touched.email && formik.errors.email
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          onBlur={formik.handleBlur}
          error={!!formik.errors.password && formik.touched.password}
          helperText={
            !!formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        />
        {isError && <Alert sx={{marginTop:2}} severity="error">{errorMessage}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar sesion
        </Button>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/auth/signup" variant="body2">
              ¿No tienes una cuenta? Inscribirse
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};
