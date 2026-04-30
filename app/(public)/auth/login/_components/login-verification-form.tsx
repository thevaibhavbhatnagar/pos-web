import React from "react";


import Button from "@/ui/button";
import ProgressBar from "@/ui/progress-bar";
import OtpCountdown from "@/ui/otp-count-down";

// import useResendLoginOtp from "@/hooks/useResendLoginOtp";
import useLoginVerification from "@/hooks/use-login-verification";
import InputOTP from "@/ui/input-otp";
import Link from "next/link";

interface Props {
  // The email entered by the user during login
  email: string;
  password: string;
}

const LoginVerificationForm: React.FC<Props> = ({ email, password }) => {
  // Custom hook to handle login verification logic, including form state, validation, and submission
  const { useLoginVerificationFormik } = useLoginVerification(email);
  // Custom hook to manage OTP resend logic during login, including state and side effects
  // const { resendOtp } = useResendLoginOtp();

  return (
    <React.Fragment>
      <ProgressBar loading={useLoginVerificationFormik.isSubmitting} />
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
          method="POST"
          onSubmit={useLoginVerificationFormik.handleSubmit}
          className="w-full flex flex-col gap-6"
        >
          <InputOTP
            length={4}
            value={useLoginVerificationFormik.values.otp}
            onChange={(value) =>
              useLoginVerificationFormik.setFieldValue("otp", value)
            }
            error={
              (useLoginVerificationFormik.touched.otp ||
                useLoginVerificationFormik.submitCount > 0) &&
              !!useLoginVerificationFormik.errors.otp
            }
            errorMessage={useLoginVerificationFormik.errors.otp}
            description="We've sent a verification code"
            email={email}
            isDisabled={useLoginVerificationFormik.isSubmitting}
            onResend={() => {
              // resendOtp(email, password);
            }}

          />
          <Button type="submit" disabled={useLoginVerificationFormik.isSubmitting}>
            Continue
          </Button>

        </form>

        {/* <OtpCountdown
          onResend={() => {
            resendOtp(email, password);
          }}
        /> */}

      </div>
    </React.Fragment>
  );
};

export default LoginVerificationForm;
