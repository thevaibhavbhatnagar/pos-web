import { useState } from "react";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import { forgotPasswordRequestValidationSchema } from "@/validations/forgot-password-request.validation";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import { toast } from "@heroui/react";

interface ForgotPasswordRequestValues {
    email: string; // User input for email
}

// Function type to switch between forgot password steps
type SwitchComponentType = React.Dispatch<React.SetStateAction<"FORGOT_PASSWORD_REQUEST" | "FORGOT_PASSWORD_VERIFICATION" | "RESET_PASSWORD">>;

const useForgotPasswordRequest = (switchComponent: SwitchComponentType, setEmail: (value: string) => void) => {
    // State to store and display error messages
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const useForgotPasswordFormik = useFormik<ForgotPasswordRequestValues>({
        initialValues: { email: "" },
        validationSchema: forgotPasswordRequestValidationSchema, // Yup validation schema for form validation
        onSubmit: async (values) => {
            try {

                setErrorMessage(null); // Clear any previous error messages

                // Destructure 'email' from form values for the API payload
                const { email: email } = values;
                // Send forgot password request to the API and ignore errors (consider handling them)
                // await axiosInstance.post<AxiosResponse>(apiEndpoints.authentication.forgotPasswordRequest, { email });

                // Save email for next step
                setEmail(values.email);
                // Move to OTP verification step
                switchComponent("FORGOT_PASSWORD_VERIFICATION");

            } catch (error: unknown) {
                // Handle and extract error message
                const message = handleAxiosError(error);
                // Set error message in state
                setErrorMessage(message);
                toast.danger(message);
            }
        },
    });

    // Return the Formik instance and error message for use in the component
    return { useForgotPasswordFormik, errorMessage };
};

export default useForgotPasswordRequest;
