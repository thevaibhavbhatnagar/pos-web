"use client";

import React from "react";
import useForgotPasswordVerification from "@/hooks/use-forgot-password-verification";
import ProgressBar from "@/ui/progress-bar";
import Button from "@/ui/button";
import InputOTP from "@/ui/input-otp";

interface Props {
  // Function to switch between forgot password steps (request, verification, reset)
  switchComponent: React.Dispatch<
    React.SetStateAction<
      | "FORGOT_PASSWORD_REQUEST"
      | "FORGOT_PASSWORD_VERIFICATION"
      | "RESET_PASSWORD"
    >
  >;
  // The email entered by the user during the password reset process
  email: string;
  // Function to store the JWT token used for verifying the password reset
  setToken: (value: string) => void;
}

// Component for handling the forgot password request form
const ForgotPasswordVerificationForm: React.FC<Props> = ({
  switchComponent,
  email,
  setToken,
}) => {
  // Custom hook to manage form state, validation, and submission for password reset
  const { useForgotPasswordVerificationFormik } =
    useForgotPasswordVerification(switchComponent, email, setToken);

  return (
    <React.Fragment>
      <ProgressBar loading={useForgotPasswordVerificationFormik.isSubmitting} />
      <div className="flex flex-col justify-center items-start gap-4 px-8 ">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base xl:text-xl font-bold text-center text-primary-foreground">
              Enter Verification Code
            </h2>
          </div>
          <p className="text-sm md:text-base font-normal text-grey">
            We've sent a verification code on {email}
          </p>
        </div> 

        <form
          onSubmit={useForgotPasswordVerificationFormik.handleSubmit}
          className="flex flex-col justify-center items-start w-full gap-6"
          method="POST"
        >

          <InputOTP
            length={4}
            value={useForgotPasswordVerificationFormik.values.otp}
            onChange={(value) =>
              useForgotPasswordVerificationFormik.setFieldValue("otp", value)
            }
            error={
              (useForgotPasswordVerificationFormik.touched.otp ||
                useForgotPasswordVerificationFormik.submitCount > 0) &&
              !!useForgotPasswordVerificationFormik.errors.otp
            }
            errorMessage={useForgotPasswordVerificationFormik.errors.otp}
            description="We've sent a verification code"
            email={email}
            isDisabled={useForgotPasswordVerificationFormik.isSubmitting}
            onResend={() => {
              // resendOtp(email, password);
            }}

          />
          <Button type="submit">Continue</Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ForgotPasswordVerificationForm;
