import { fbAuth } from "../../../services/firebase-conf";

const validEmail = (email: string) => {
  return /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(email);
};

const validPassword = (password: string) => {
  return /^.{8,}$/.test(password);
};

export const loginUser = async (email: string, password: string) => {
  return fbAuth.signInWithEmailAndPassword(email, password);
};

export const registerNewUser = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  return new Promise<string>((resolve, reject) => {
    const errors = {
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    let hasError = !validEmail(email);
    if (hasError) errors.email = "Insira um e-mail válido";

    hasError = !validPassword(password);
    if (hasError)
      errors.password = "Sua senha deve ter pelo menos 8 caracteres";

    hasError = password !== passwordConfirmation;
    if (hasError)
      errors.passwordConfirmation = "As senhas inseridas não combinam";

    if (hasError) return reject(errors);

    fbAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => resolve("signup/success"))
      .catch((e) => {
        return resolve(e.code);
      });
  });
};
