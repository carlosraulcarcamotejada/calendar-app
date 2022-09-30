import { FC } from "react";
import { CssBaseline } from "@mui/material";
import { AppRouter } from "./router/";
import { BrowserRouter } from "react-router-dom";

export const CalendarApp: FC = (): JSX.Element => {
  const authStatus = "not-authenticated"; 

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRouter />
    </BrowserRouter>
  );
};
