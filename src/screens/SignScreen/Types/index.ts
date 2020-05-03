export interface ISignForm {
  onSignInSelected: () => void;
  onSignUpSelected: () => void;
}

export interface ILoginRefForm {
  type: "login" | "register";
}

export type SignErrors = {
  email: string;
  password: string;
  passwordConfirmation: string;
};
