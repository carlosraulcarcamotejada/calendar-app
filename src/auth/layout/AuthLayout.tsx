import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type props = {
  title: string;
  children: JSX.Element[] | JSX.Element;
};

const theme = createTheme();

export const AuthLayout: FC<props> = ({ title, children }): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box sx={{ mt: 3 }}>
            {children}
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

const Copyright: FC = (): JSX.Element => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © Carlos Cárcamo "}
      <Link color="inherit" href="https://mui.com/">
       {"Calendar App "}
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
};
