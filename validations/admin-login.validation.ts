import * as Yup from "yup";

// Regular expression for validating a Kenyan phone number (e.g., +2547XXXXXXXX or 07XXXXXXXX)
// const kenyanPhoneRegex = /^(?:254|\+254|0)?([17](?:(?:[0-9][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/;

export const AdminLoginValidationSchema = Yup.object().shape({
  // Either email must be provided
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required"),

  // Password validation
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters long")
    .required("Password is required"),
});
