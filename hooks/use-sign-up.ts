import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";

import { signupValidationSchema } from "@/validations/signup.validation";

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { toast } from "@heroui/react";

interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type SwitchComponentType = React.Dispatch<
  React.SetStateAction<"SIGNUP_COMPONENT" | "SIGNUP_VERIFICATION_COMPONENT">
>;

const useSignUp = (
  switchComponent: SwitchComponentType,
  setEmail: (value: string) => void,
  setPassword: (value: string) => void,
) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const useSignUpFormik = useFormik<SignUpFormValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupValidationSchema,

    onSubmit: async (values: SignUpFormValues) => {
      try {
        setErrorMessage(null);

        const { fullName, email, password } = values;

        await axiosInstance.post<AxiosResponse>(
          apiEndpoints.authentication.signup,
          {
            fullName,
            email,
            password,
          },
        );

        switchComponent("SIGNUP_VERIFICATION_COMPONENT");

        setEmail(email);
        setPassword(password);
      } catch (error: unknown) {
        const message = handleAxiosError(error);
        setErrorMessage(message);
        toast.danger(message);
      }
    },
  });

  return { useSignUpFormik, errorMessage };
};

export default useSignUp;
