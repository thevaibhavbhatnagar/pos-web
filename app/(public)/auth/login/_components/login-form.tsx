import React from "react";

import Button from "@/ui/button";
import TextInput from "@/ui/text-input";
import ProgressBar from "@/ui/progress-bar";
import PasswordInput from "@/ui/password-input";

import useLogin from "@/hooks/use-login";
import Link from "next/link"; 

interface Props {
  // Function to switch between login components (e.g., login form and verification step)
  switchComponent: React.Dispatch<
    React.SetStateAction<"LOGIN_COMPONENT" | "LOGIN_VERIFICATION_COMPONENT">
  >;
  // Function to update the email entered by the user
  setEmail: (value: string) => void;

  setPassword: (value: string) => void;
}

const LoginForm: React.FC<Props> = ({
  switchComponent,
  setEmail,
  setPassword,
}) => {
  // Custom hook to handle login form logic, validation, and submission
  const { useLoginFormik } = useLogin(
    switchComponent,
    setEmail,
    setPassword
  );

  return (
    <React.Fragment>
      <ProgressBar loading={useLoginFormik.isSubmitting} />
      
      <div className="w-full flex flex-col justify-center">
        <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign In
          </h2>
          <p className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
            Please enter your credentials to continue
          </p>
        </div>

        <form onSubmit={useLoginFormik.handleSubmit} method="POST" className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={useLoginFormik.values.email}
              onChange={useLoginFormik.handleChange}
              error={
                !!useLoginFormik.errors.email && !!useLoginFormik.touched.email
              }
              errorMessage={useLoginFormik.errors.email} 
            />

            {/* Password Field */}
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={useLoginFormik.values.password}
              onChange={useLoginFormik.handleChange}
              error={
                !!useLoginFormik.errors.password &&
                !!useLoginFormik.touched.password
              }
              errorMessage={useLoginFormik.errors.password}
            />
          </div>

          <div className="flex items-center justify-end mt-[-10px]">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Login
          </Button>

          <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
