import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";
import { resetPasswordValidationSchema } from "@/validations/reset-password.validation";
import { toast } from "@heroui/react";

interface ResetPasswordValues {
  token: string; // JWT token received for password reset verification
  password: string; // New password entered by the user
  confirmPassword: string; // Confirmation of the new password to ensure they match
}

const useResetPassword = (token: string) => {
  // State to store and display error messages during OTP verification
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter(); // Next.js router for navigation

  const useResetPasswordFormik = useFormik<ResetPasswordValues>({
    initialValues: {
      token,
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage(null); // Clear any previous error messages before making the request

        // Destructure 'confirmPassword' from form values and rename it to 'confirm_password' for the API payload
        const { confirmPassword: password_confirm, ...rest } = values;
        // Send password reset request to the API with the transformed payload
        await axiosInstance.post<AxiosResponse>(
          apiEndpoints.authentication.forgotPasswordReset,
          { ...rest, password_confirm },
        );

        // Redirect to login after successful password changed, ensuring scroll to top
        router.push("/auth/login", { scroll: true });
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
  return { useResetPasswordFormik, errorMessage };
};

export default useResetPassword;
