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
import { useAuthStore, useCalendarStore } from "../../hooks";

export const NavBar: FC = (): JSX.Element => {
  const { startLogout, user } = useAuthStore();

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
            {`${user.name || ""} ${user.lastname || ""}`}
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={startLogout}
              startIcon={<LogoutOutlined />}
            >
              Salir
            </Button>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
