import * as Yup from "yup";

// Validation schema for the forgot password request form
export const forgotPasswordRequestValidationSchema = Yup.object().shape({
    // Either email must be provided
    email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email address is required"),
});
