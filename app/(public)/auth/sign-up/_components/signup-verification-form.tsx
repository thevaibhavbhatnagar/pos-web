import React from "react";

import Button from "@/ui/button";
import ProgressBar from "@/ui/progress-bar";
import InputOTP from "@/ui/input-otp";

import useSignUpVerification from "@/hooks/use-sign-up-verification";

interface Props {
  // Email entered during signup
  email: string;

  // Password entered during signup
  password: string;
}

const SignUpVerificationForm: React.FC<Props> = ({
  email,
  password,
}) => {
  // Custom hook for signup OTP verification
  const {
    useSignUpVerificationFormik,
    errorMessage,
  } = useSignUpVerification(email);

  return (
    <React.Fragment>
      {/* Top loading bar */}
      <ProgressBar
        loading={
          useSignUpVerificationFormik.isSubmitting
        }
      />

      {/* Main wrapper */}
      <div className="flex flex-col justify-center items-start gap-4 px-8 ">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-primary-foreground xl:text-xl">
              Enter Verification Code
            </h2>
          </div>

          <p className="text-sm font-normal text-grey md:text-base">
            We've sent a verification code on{" "}
            {email}
          </p>
        </div>

        {/* Form */}
        <form
          method="POST"
          onSubmit={
            useSignUpVerificationFormik.handleSubmit
          }
          className="flex w-full flex-col gap-6"
        >
          {/* OTP Input */}
          <InputOTP
            length={4}
            value={
              useSignUpVerificationFormik.values.otp
            }
            onChange={(value) =>
              useSignUpVerificationFormik.setFieldValue(
                "otp",
                value
              )
            }
            error={
              (useSignUpVerificationFormik
                .touched.otp ||
                useSignUpVerificationFormik.submitCount >
                0) &&
              !!useSignUpVerificationFormik.errors.otp
            }
            errorMessage={
              useSignUpVerificationFormik.errors.otp
            }
            description="We've sent a verification code"
            email={email}
            isDisabled={
              useSignUpVerificationFormik.isSubmitting
            }
            onResend={() => {
              // Add resend signup OTP API here
              console.log(
                "Resend signup OTP",
                email,
                password
              );
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              useSignUpVerificationFormik.isSubmitting
            }
          >
            Continue
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUpVerificationForm;