import { useState } from "react";
import { useFormik } from "formik";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import { forgotPasswordVerificationValidationSchema } from "@/validations/forgot-password-verification.validation";
import { toast } from "@heroui/react";

interface ForgotPasswordVerificationValues {
  email: string; // User's email used for verification
  otp: string; // One-time password (OTP) entered by the user
}

// Function type to switch between different forgot password steps
type SwitchComponentType = React.Dispatch<
  React.SetStateAction<
    | "FORGOT_PASSWORD_REQUEST"
    | "FORGOT_PASSWORD_VERIFICATION"
    | "RESET_PASSWORD"
  >
>;

// Function to store the JWT token used for verifying the password reset
type SetTokenType = (value: string) => void;

const useForgotPasswordVerification = (
  switchComponent: SwitchComponentType,
  email: string,
  setToken: SetTokenType,
) => {
  // State to store and display error messages during OTP verification
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const useForgotPasswordVerificationFormik =
    useFormik<ForgotPasswordVerificationValues>({
      initialValues: { email, otp: "" },
      validationSchema: forgotPasswordVerificationValidationSchema,
      onSubmit: async (values) => {
        try {
          setErrorMessage(null); // Clear any previous error messages

          // Destructure 'email' from form values and rename it to 'email' for the API payload
          const { email: email, otp } = values;
          // Send OTP verification request to the API and ignore errors (consider handling them)
          // const { data: response } = await axiosInstance.post(apiEndpoints.authentication.forgotPasswordVerification, { email, otp });

          // Move to reset password step
          switchComponent("RESET_PASSWORD");
          // Store the received JWT token and proceed to the reset password step
          // setToken(response.token);
        } catch (error: unknown) {
          // Handle and extract error message
          const message = handleAxiosError(error);
          // Set error message in state
          toast.danger(message);
        }
      },
    });

  // Return the Formik instance and error message for use in the component
  return { useForgotPasswordVerificationFormik, errorMessage };
};

export default useForgotPasswordVerification;
