import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage, SignInPage } from "../";

export const AuthRoutes: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="/*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
};
