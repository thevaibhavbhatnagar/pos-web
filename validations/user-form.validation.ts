import * as Yup from "yup";

export const userFormValidation = Yup.object().shape({
  // type: Yup.string()
  //     .required("User type is required"),

  role: Yup.string().required("User role is required"),

  name: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email"),

  branchId: Yup.string().required("Branch is required"),
  // mobileNumber: Yup.string()
  //     .required("Mobile number is required")
  //     .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  password: Yup.string().notRequired(),
});
