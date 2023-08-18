import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required!")
    .matches(/^[a-zA-Z_ ]*$/, "Invalid name!")
    .min(2, "Name at least 2 characters!"),

  email: Yup.string().required("Email address is required!").email("Invalid email address!"),

  status: Yup.string().max(64, "Status must be less than 64 characters!"),

  password: Yup.string()
    .required("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain atleast 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character!"
    ),
});
