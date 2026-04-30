import * as Yup from "yup";


// Validation schema for the forgot password verification form
export const forgotPasswordVerificationValidationSchema = Yup.object().shape({

    // Either email must be provided
    email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email address is required"),

    // Validate OTP input
    otp: Yup.string()
        .required("OTP is required") // Ensure OTP is provided
        .matches(/^\d{4}$/, "OTP must be a 4-digit number"), // Ensure OTP is exactly 6 digits
});
