import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";

import {  AdminLoginValidationSchema } from "@/validations/admin-login.validation"; // Validation schema for login form

import apiEndpoints from "@/utils/endpoints"; // API endpoints configuration
import axiosInstance, {
  handleAxiosError,
  isConflictWithContext,
} from "@/utils/axiosInstance"; // Configured Axios instance and error handler
import { toast } from "@heroui/react";

// Define the structure of form values
interface LoginFormValues {
  email: string;
  password: string;
}

// Custom hook for handling login logic and UI state management
const useAdminLogin = ( 
  setEmail: (value: string) => void,
  setPassword: (value: string) => void,
) => {
  const router = useRouter();
  // State to store error messages related to login attempts
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Formik instance for managing login form state and validation
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "", // Initial value for email
      password: "", // Initial value for password
    },
    validationSchema: AdminLoginValidationSchema, // Yup validation schema for form validation
    onSubmit: async (values: LoginFormValues) => {
      try {
        setErrorMessage(null); // Clear any previous error messages

        // Destructure 'email' from form values and rename it to 'email' for the API payload
        const { email: email, password } = values;
        // Send a POST request to the login endpoint with the user's email and password
        await axiosInstance.post<AxiosResponse>(
          apiEndpoints.authentication.login,
          { email, password },
        );
 
        // Store the user's email for later use (e.g., verification step)
        setEmail(values.email);

        setPassword(values.password);
      } catch (error: unknown) {
        // Handle and extract error message
        const message = handleAxiosError(error);
        // Set error message in state
        setErrorMessage(message);
        toast.danger(message);

        if (isConflictWithContext(error)) {
          // Briefly delay to ensure the toast appears cleanly before any navigation
          setTimeout(() => {
            setErrorMessage("Redirecting to the verification page...");
            toast.danger("Redirecting to the verification page...");
          }, 500);

          // After a short pause, redirect the user to the verification page,
          setTimeout(
            () =>
              router.push(
                `/auth/verify?email=${encodeURIComponent(values.email)}`,
              ),
            5000,
          );
        }
      }
    },
  });

  // Return the Formik instance and error message for use in the component
  return { formik, errorMessage };
};

export default useAdminLogin;
