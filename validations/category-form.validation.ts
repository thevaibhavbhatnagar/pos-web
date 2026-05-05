import * as Yup from "yup";

export const categoryFormValidation = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .min(3, "Category name must be at least 3 characters"),

  isActive: Yup.string().required("Is Active is required"),
});
