import React from "react";

import Button from "@/ui/button";
import TextInput from "@/ui/text-input";
import ProgressBar from "@/ui/progress-bar";
import PasswordInput from "@/ui/password-input";

import useLogin from "@/hooks/use-login";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";

// import Logo from "@/public/assets/logo.svg"

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
      {/* children */}
      <div className="w-full flex flex-col justify-center px-8 h-full gap-4">
        {/* <Image src={""} alt="logo" width={100} height={100} className="w-full h-24 pb-4" unoptimized /> */}


        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base xl:text-xl font-bold text-center text-primary-foreground">
              Sign In
            </h2>
            <Link
              href="/auth/sign-up"
              className="text-sm text-primary font-normal hover:underline"
            >
              I don't have an account
            </Link>
          </div>
          <p className="text-sm md:text-base font-normal text-grey">
            Please enter your credentials to Login
          </p>
        </div> 
        <form onSubmit={useLoginFormik.handleSubmit} method="POST" className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
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

          <Button type="submit">Login</Button>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary font-normal hover:underline"
          >
            Forgot password?
          </Link>
        </form>
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
