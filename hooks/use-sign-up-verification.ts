import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { signupVerificationValidationSchema } from "@/validations/signup-verification.validation";

import { handleAxiosError } from "@/utils/axiosInstance";
import { toast } from "@heroui/react";

interface SignUpVerificationFormValues {
  email: string;
  otp: string;
}

// Custom hook for handling signup verification logic
const useSignUpVerification = (email: string) => {
  // State for storing error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Next.js router for navigation
  const router = useRouter();

  // Formik instance for managing signup verification form state
  const useSignUpVerificationFormik = useFormik<SignUpVerificationFormValues>({
    initialValues: {
      email: email, // Prefilled email from signup step
      otp: "", // Initial OTP value
    },

    // Yup validation schema
    validationSchema: signupVerificationValidationSchema,

    // Handle form submit
    onSubmit: async (values: SignUpVerificationFormValues) => {
      try {
        // Clear previous errors
        setErrorMessage(null);

        // Authenticate verified user using NextAuth credentials
        const result = await signIn("credentials", {
          email: values.email,
          otp: values.otp,
          redirect: false,
        });

        // If OTP is invalid
        if (result?.error) {
          setErrorMessage("Invalid OTP or verification failed");
          toast.danger("Invalid OTP or verification failed");
          return;
        }

        // Preload dashboard page for faster redirect
        router.prefetch("/dashboard");

        // Redirect user after successful signup verification
        router.push("/dashboard", {
          scroll: true,
        });
      } catch (error: unknown) {
        // Extract readable message from API error
        const message = handleAxiosError(error);

        // Store error message in state
        setErrorMessage(message);

        toast.danger(message);
      }
    },
  });

  // Return Formik instance + server error
  return {
    useSignUpVerificationFormik,
    errorMessage,
  };
};

export default useSignUpVerification;
