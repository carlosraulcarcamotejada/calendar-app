import { FC } from "react";
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { CalendarMonthOutlined, LogoutOutlined } from "@mui/icons-material";


export const NavBar: FC = (): JSX.Element => {
  const onLogout = () => {console.log('saliendo')};

  return (
    <AppBar position="fixed">
      <Toolbar>
        <CalendarMonthOutlined sx={{ mr: 2 }} />

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Usuario
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button variant="outlined" color="inherit" onClick={onLogout} startIcon={<LogoutOutlined />}>
              Salir
            </Button>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
