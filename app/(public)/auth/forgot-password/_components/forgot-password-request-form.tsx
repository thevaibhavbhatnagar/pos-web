import React from 'react';
import Link from 'next/link';
import TextInput from '@/ui/text-input';
import useForgotPasswordRequest from '@/hooks/use-forgot-password-request'
// import ForgotPassword from "@/public/assets/login/forgotPassword.svg"
import ProgressBar from '@/ui/progress-bar';
import Button from '@/ui/button';

interface Props {
  // Function to switch between forgot password steps (request, verification, reset)
  switchComponent: React.Dispatch<React.SetStateAction<"FORGOT_PASSWORD_REQUEST" | "FORGOT_PASSWORD_VERIFICATION" | "RESET_PASSWORD">>;
  // Function to store the user's email for the password reset process
  setEmail: (value: string) => void;
};

// Component for handling the forgot password request form
const ForgotPasswordRequestForm: React.FC<Props> = ({ switchComponent, setEmail }) => {
  // Custom hook to manage form state, validation, and submission for password reset
  const { useForgotPasswordFormik } = useForgotPasswordRequest(switchComponent, setEmail);

  return (
    <React.Fragment>
      <ProgressBar loading={useForgotPasswordFormik.isSubmitting} />
      <div className="w-full flex flex-col justify-center  h-full gap-2">
        {/* <Image src={ForgotPassword} alt="OTP Confirmation not found" width={200} height={200} className="w-full max-w-32 md:max-w-40 md:h-44" /> */}

        <div className="flex flex-col gap-1 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl xl:text-2xl font-bold text-center text-slate-900 dark:text-white"> Forgot Password? </h2>
            <Link href="/auth/login" className="text-sm text-primary font-medium hover:underline"> Back to Login </Link>
          </div>
          <p className="text-sm md:text-base font-normal text-slate-500 dark:text-slate-400"> Enter your email to receive reset instructions.</p>
        </div>      
        <form onSubmit={useForgotPasswordFormik.handleSubmit} className="flex flex-col gap-5" method="POST">
          <TextInput name="email" placeholder="Enter your email" value={useForgotPasswordFormik.values.email} onChange={useForgotPasswordFormik.handleChange}
            error={!!useForgotPasswordFormik.errors.email && !!useForgotPasswordFormik.touched.email}
            errorMessage={useForgotPasswordFormik.errors.email} label='Email'
          ></TextInput>
          <Button type="submit"> Send OTP </Button>
        </form>
        <Link href="/auth/login" className='font-semibold text-base hover:underline mt-4 text-grey text-center'>← Back to login</Link>
      </div>
    </React.Fragment>
  )
}

export default ForgotPasswordRequestForm