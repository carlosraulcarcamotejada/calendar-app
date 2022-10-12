import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../auth";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter: FC = (): JSX.Element => {
  const authStatus = "authenticated";

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") return <h1>Loading...</h1>;

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<SignInPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
