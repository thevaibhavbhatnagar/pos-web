import React from "react";
import { Mail, Lock } from "lucide-react";

import Button from "@/ui/button";
import TextInput from "@/ui/text-input";
import ProgressBar from "@/ui/progress-bar";
import PasswordInput from "@/ui/password-input";
import useLogin from "@/hooks/use-login";


const LoginForm: React.FC = () => {
  const { formik } = useLogin();

  return (
    <React.Fragment>
      <ProgressBar loading={formik.isSubmitting} />

      <form onSubmit={formik.handleSubmit} method="POST" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            startContent={<Mail size={18} />}
            autoFocus
            error={!!formik.errors.email && !!formik.touched.email}
            errorMessage={formik.errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            startContent={<Lock size={18} />}
            error={!!formik.errors.password && !!formik.touched.password}
            errorMessage={formik.errors.password}
          />
        </div>

        {/* <div className="flex items-center justify-end mt-[-10px]">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div> */}

        <Button
          type="submit"
          className="w-full h-12 text-base font-medium"
        >
          Login
        </Button>
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
