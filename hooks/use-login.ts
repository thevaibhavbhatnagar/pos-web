import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";

import { LoginValidationSchema } from "@/validations/login.validation"; // Validation schema for login form
import { toast } from "@heroui/react";
import { signIn } from "next-auth/react";
import { handleAxiosError, isConflictWithContext } from "@/utils/axiosInstance";

// Define the structure of form values
interface LoginFormValues {
  email: string;
  password: string;
}

// Custom hook for handling login logic and UI state management
const useLogin = () => {
  const router = useRouter();
  // State to store error messages related to login attempts
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Formik instance for managing login form state and validation
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "", // Initial value for email
      password: "", // Initial value for password
    },
    validationSchema: LoginValidationSchema, // Yup validation schema for form validation
    onSubmit: async (values: LoginFormValues) => {
      try {
        setErrorMessage(null); // Clear any previous error messages

        const response = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (response?.error) {
          if (response.error === "CredentialsSignin") {
            const msg = "Invalid email or password";
            setErrorMessage(msg);
            toast.danger(msg);
          } else if (response.error === "SERVER_UNREACHABLE") {
            const msg =
              "Server is temporarily unreachable. Please check your connection.";
            setErrorMessage(msg);
            toast.danger(msg);
          } else if (response.error === "ACCESS_DENIED") {
            const msg = "Access denied. You do not have permission to log in.";
            setErrorMessage(msg);
            toast.danger(msg);
          } else if (response.error === "ACCOUNT_NOT_VERIFIED") {
            setErrorMessage("Account not verified. Redirecting...");
            toast.danger("Please verify your account.");

            // Redirect to verification page after a short delay
            setTimeout(() => {
              router.push(
                `/auth/verify?email=${encodeURIComponent(values.email)}`,
              );
            }, 3000);
          } else if (response.error === "SERVER_ERROR") {
            const msg = "Internal server error. Please try again later.";
            setErrorMessage(msg);
            toast.danger(msg);
          } else {
            const msg =
              response.error || "An unexpected error occurred during login";
            setErrorMessage(msg);
            toast.danger(msg);
          }
          return;
        }

        if (!response?.error) {
          toast.success("Login successful");
          router.push("/dashboard");
        }
      } catch (error: unknown) {
        // This catch block usually only handles unexpected runtime errors during the onSubmit call
        const message = handleAxiosError(error);
        setErrorMessage(message);
        toast.danger(message);
      }
    },
  });

  // Return the Formik instance and error message for use in the component
  return { formik, errorMessage };
};

export default useLogin;
