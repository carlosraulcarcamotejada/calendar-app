import { FC } from "react";
import { CssBaseline } from "@mui/material";
import { AppRouter } from "./router/";
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from "./store";

export const CalendarApp: FC = (): JSX.Element => {
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
