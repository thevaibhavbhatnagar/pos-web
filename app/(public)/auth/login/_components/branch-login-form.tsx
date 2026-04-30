import React from "react";
import Link from "next/link";
import { Building, Lock } from "lucide-react";

import Button from "@/ui/button";
import ProgressBar from "@/ui/progress-bar";
import PasswordInput from "@/ui/password-input";
import SelectField from "@/ui/select";

import useBranchLogin from "@/hooks/use-branch-login";

interface Props {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

const branchOptions = [
  { label: "Kota Main Branch", value: "kota_main" },
  { label: "Jaipur Branch", value: "jaipur" },
  { label: "Delhi Branch", value: "delhi" },
];

const BranchLoginForm: React.FC<Props> = ({
  setEmail,
  setPassword,
}) => {
  const { formik } = useBranchLogin(
    setEmail,
    setPassword
  );

  return (
    <React.Fragment>
      <ProgressBar loading={formik.isSubmitting} />

      <form onSubmit={formik.handleSubmit} method="POST" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <SelectField
            name="branch"
            label="Select Branch"
            placeholder="Choose branch"
            options={branchOptions}
            formik={formik} 
            onChange={(value) => {
              console.log("Selected branch:", value);
            }}
            autoFocus
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
          className="w-full h-12 text-base font-medium"
        >
          Login
        </Button>
      </form>
    </React.Fragment>
  );
};

export default BranchLoginForm;
