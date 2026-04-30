import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { loginVerificationValidationSchema } from "@/validations/login.validation"; // Validation schema for login form

import { handleAxiosError } from "@/utils/axiosInstance"; // Configured Axios instance and error handler
import { toast } from "@heroui/react";

// Define the structure of form values
interface LoginVerificationFormValues {
  email: string;
  otp: string;
}

const useLoginVerification = (email: string) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for storing error messages
  const router = useRouter(); // Next.js router for navigation

  // Formik instance for managing login form state and validation
  const useLoginVerificationFormik = useFormik<LoginVerificationFormValues>({
    initialValues: {
      email: email, // Initial value for email
      otp: "", // Initial value for password
    },
    validationSchema: loginVerificationValidationSchema, // Yup validation schema for form validation
    onSubmit: async (values: LoginVerificationFormValues) => {
      try {
        setErrorMessage(null); // Clear any previous error messages

        const result = await signIn("credentials", {
          email: values.email,
          otp: values.otp,
          redirect: false,
        });

        if (result?.error) {
          setErrorMessage("Invalid OTP or login failed");
          toast.danger("Invalid OTP or login failed");
          return;
        }
        // Preloads dashboard page assets for faster navigation
        router.prefetch("/");
        // Redirect to dashboard after successful login, ensuring scroll to top
        router.push("/dashboard", { scroll: true });
      } catch (error: any) {
        // Handle and extract error message
        const message = handleAxiosError(error);
        // Set error message in state
        setErrorMessage(message);
        toast.danger(message);
      }
    },
  });

  // Return the Formik instance and error message for use in the component
  return { useLoginVerificationFormik, errorMessage };
};

export default useLoginVerification;
