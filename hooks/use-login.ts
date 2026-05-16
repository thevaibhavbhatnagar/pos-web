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

          callbackUrl: "/dashboard",
        });

        console.log("NEXTAUTH RESPONSE:", response);

        // LOGIN FAILED
        if (response?.error) {
          let msg = "Something went wrong during login.";

          switch (response.error) {
            case "CredentialsSignin":
              msg = "Invalid email or password";
              break;

            case "SERVER_UNREACHABLE":
              msg =
                "Server is temporarily unreachable. Please check your internet connection.";
              break;

            case "ACCESS_DENIED":
              msg =
                "Access denied. You do not have permission to login.";
              break;

            case "ACCOUNT_NOT_VERIFIED":
              msg = "Please verify your account first.";
              break;

            case "SERVER_ERROR":
              msg =
                "Internal server error. Please try again later.";
              break;

            default:
              msg = "Something went wrong during login.";
          }

          setErrorMessage(msg);

          toast.danger(msg);

          return;
        }

        // LOGIN SUCCESS
        toast.success("Login successful");

        // SAFE PRODUCTION REDIRECT
        if (response?.url) {
          window.location.href = response.url;
        }
      } catch (error) {
        console.error("LOGIN ERROR:", error);

        const msg = "Unexpected login error.";

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