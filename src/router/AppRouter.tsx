import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarPage } from "../calendar";

export const AppRouter: FC = (): JSX.Element => {
  const authStatus = "not-authenticated";

  return (
    <Routes>
      {authStatus === "authenticated" ? (
        <Route path="/auth/*" element={<AuthRoutes />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
