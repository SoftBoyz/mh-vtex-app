export interface ISignForm {
  onSignInSelected: () => void;
  onSignUpSelected: () => void;
}

export interface ILoginRefForm {
  type: "login" | "register";
}
