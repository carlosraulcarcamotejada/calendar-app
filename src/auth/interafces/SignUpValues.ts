import { SignInValues } from "..";

export interface SignUpValues extends SignInValues {
    name:string,
    lastname:string,
    confirmpassword:string,
}