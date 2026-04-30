import * as Yup from "yup";

export const branchLoginValidationSchema = Yup.object({
  branch: Yup.string().required("Branch is required"),
  password: Yup.string()
    .min(8, "Your password must be at least 8 characters long")
    .required("Password is required"),
});
