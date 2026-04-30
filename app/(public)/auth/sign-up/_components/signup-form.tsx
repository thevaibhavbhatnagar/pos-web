import React from "react";

import Button from "@/ui/button";
import TextInput from "@/ui/text-input";
import ProgressBar from "@/ui/progress-bar";
import PasswordInput from "@/ui/password-input";

import Link from "next/link";
import useSignUp from "@/hooks/use-sign-up";

interface Props {
  switchComponent: React.Dispatch<
    React.SetStateAction<
      "SIGNUP_COMPONENT" | "SIGNUP_VERIFICATION_COMPONENT"
    >
  >;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

const SignUpForm: React.FC<Props> = ({
  switchComponent,
  setEmail,
  setPassword,
}) => {
  const { useSignUpFormik } = useSignUp(
    switchComponent,
    setEmail,
    setPassword
  );

  return (
    <React.Fragment>
      <ProgressBar loading={useSignUpFormik.isSubmitting} />

      <div className="w-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign Up
            </h2>

            <Link
              href="/auth/login"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Already have an account?
            </Link>
          </div>

          <p className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
            Create your account to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={useSignUpFormik.handleSubmit}
          method="POST"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <TextInput
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={useSignUpFormik.values.fullName}
              onChange={useSignUpFormik.handleChange}
              error={
                !!useSignUpFormik.errors.fullName &&
                !!useSignUpFormik.touched.fullName
              }
              errorMessage={useSignUpFormik.errors.fullName}
            />

            {/* Email */}
            <TextInput
              label="Email"
              name="email"
              placeholder="Enter your email"
              value={useSignUpFormik.values.email}
              onChange={useSignUpFormik.handleChange}
              error={
                !!useSignUpFormik.errors.email &&
                !!useSignUpFormik.touched.email
              }
              errorMessage={useSignUpFormik.errors.email}
            />

            {/* Password */}
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={useSignUpFormik.values.password}
              onChange={useSignUpFormik.handleChange}
              error={
                !!useSignUpFormik.errors.password &&
                !!useSignUpFormik.touched.password
              }
              errorMessage={useSignUpFormik.errors.password}
            />

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={useSignUpFormik.values.confirmPassword}
              onChange={useSignUpFormik.handleChange}
              error={
                !!useSignUpFormik.errors.confirmPassword &&
                !!useSignUpFormik.touched.confirmPassword
              }
              errorMessage={
                useSignUpFormik.errors.confirmPassword
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUpForm;