import * as Yup from "yup";

export const signupVerificationValidationSchema = Yup.object({
  // Either email must be provided
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required"),
  // OTP validation
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be a 4-digit number")
    .required("OTP is required"),
});
