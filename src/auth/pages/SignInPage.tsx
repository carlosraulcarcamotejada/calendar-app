import { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { AuthLayout, SignInValues } from "../";
import { FormikProps, useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";

const initialValues: SignInValues = {
  email: "",
  password: "",
};

export const SignInPage: FC = (): JSX.Element => {
  const onSubmit = (values: SignInValues) => {
    console.log(values);
    formik.resetForm();
  };

  const formik: FormikProps<SignInValues> = useFormik<SignInValues>({
    initialValues,
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Iniciar sesion
        </Button>
        <Grid container>
          <Grid item xs display="none">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
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
