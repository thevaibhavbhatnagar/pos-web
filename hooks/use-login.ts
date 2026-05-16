// hooks/use-login.ts

import { useState } from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";

import { toast } from "@heroui/react";

import { LoginValidationSchema } from "@/validations/login.validation";

interface LoginFormValues {
  email: string;
  password: string;
}

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginValidationSchema,

    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        setErrorMessage(null);

        const response = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        console.log("NEXTAUTH RESPONSE:", response);

        // Invalid credentials
        if (response?.error === "CredentialsSignin") {
          const msg = "Invalid email or password";

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // Server unreachable
        if (response?.error === "SERVER_UNREACHABLE") {
          const msg =
            "Server is temporarily unreachable. Please try again later.";

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // Access denied
        if (response?.error === "ACCESS_DENIED") {
          const msg = "Access denied. You do not have permission to login.";

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // Account not verified
        if (response?.error === "ACCOUNT_NOT_VERIFIED") {
          const msg = "Please verify your account first.";

          setErrorMessage(msg);

          toast.danger(msg);

          setTimeout(() => {
            window.location.href = `/auth/verify?email=${encodeURIComponent(
              values.email,
            )}`;
          }, 2000);

          return;
        }

        // Server error
        if (response?.error === "SERVER_ERROR") {
          const msg = "Internal server error. Please try again later.";

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // Unknown error
        if (response?.error) {
          const msg = "Something went wrong during login.";

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // SUCCESS
        toast.success("Login successful");

        // IMPORTANT:
        // Full reload prevents production session race issues
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("LOGIN ERROR:", error);

        const msg = "Unexpected login error";

        setErrorMessage(msg);

        toast.danger(msg);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    formik,
    errorMessage,
    isLoading,
  };
};

export default useLogin;
