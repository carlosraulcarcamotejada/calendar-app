import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { SignInValues, SignUpValues } from "../auth";
import {
  AppDispatch,
  onChecking,
  onLogin,
  onLogout,
  onLogoutCalendar,
  RootState,
} from "../store";

export const useAuthStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  //======== Function startLogin() ========
  const startLogin = async (user: SignInValues) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth", { ...user });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(
        onLogin({
          _id: data._id,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
        })
      );
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas."));
      console.log(error);
    }
  };

  //======== Function startSingUp() ========
  const startSingUp = async (user: SignUpValues) => {
    try {
      dispatch(onChecking());
      const { data } = await calendarApi.post("/auth/signup", { ...user });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({
          _id: data._id,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
        })
      );
    } catch (error: any) {
      const errorMessage: string = error?.response?.data?.message || "";
      dispatch(onLogout(errorMessage));
      console.log(error);
    }
  };

  //======== Function checkAuthToken() ========
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (!token) return dispatch(onLogout(null));

    try {
      const { data } = await calendarApi.get("/auth/renew");

      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());

      dispatch(
        onLogin({
          _id: data._id,
          email: data.email,
          name: data.name,
          lastname: data.lastname,
        })
      );
    } catch (error) {
      localStorage.setItem("token", "");
      localStorage.setItem("token-init-date", "");
      dispatch(onLogout("El token ha expirado."));
    }
  };

  //======== Function startLogout() ========
  const startLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("token-init-date", "");
    dispatch(onLogoutCalendar());
    dispatch(onLogout(null));
  };

  return {
    //Properties
    ...auth,
    isError: !!auth.errorMessage,
    //Methods
    startLogin,
    startSingUp,
    checkAuthToken,
    startLogout,
  };
};
