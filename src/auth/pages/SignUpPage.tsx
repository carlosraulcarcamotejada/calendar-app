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


const initialValues:SignUpValues = {
  email:"",
  password:"",
  name: "",
  lastname:"",
};


export const SignUpPage: FC = (): JSX.Element => {

  const onSubmit = (values: SignUpValues) => {
    console.log(values);
    formik.resetForm();
  };

  const formik: FormikProps<SignUpValues> = useFormik<SignUpValues>({
    initialValues,
    onSubmit,
  });

  return (
    <AuthLayout title="Sign up" >
    <Box component="form" noValidate onSubmit={formik.handleSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
            fullWidth
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            onChange={formik.handleChange}
            label="Password"
            type="password"
            value={formik.values.password}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/auth/signin" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>


    </AuthLayout>
  );
};
