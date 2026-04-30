import * as Yup from "yup";

export const resetPasswordValidationSchema = Yup.object().shape({
    // Ensure a valid JWT token string is provided
    token: Yup.string()
        .required("Token is required"),

    // Password validation
    password: Yup.string()
        .min(8, "Your password must be at least 8 characters long")
        .required("Password is required"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});
