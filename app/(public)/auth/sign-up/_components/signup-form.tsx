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

      <div className="w-full flex flex-col justify-center px-8 h-full gap-4">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-primary-foreground xl:text-xl">
              Sign Up
            </h2>

            <Link
              href="/auth/login"
              className="text-sm font-normal text-primary hover:underline"
            >
              Already have an account?
            </Link>
          </div>

          <p className="text-sm text-grey">
            Create your account to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={useSignUpFormik.handleSubmit}
          method="POST"
          className="flex flex-col gap-5"
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
          // isLoading={useSignUpFormik.isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUpForm;