import { FC } from "react";
import reactLogo from "./assets/react.svg";
import { CssBaseline } from "@mui/material";

export const CalendarApp: FC = (): JSX.Element => {
  return (
    <>
      <CssBaseline />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  );
};
