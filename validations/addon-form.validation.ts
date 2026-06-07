import * as Yup from "yup";

export const addonFormValidation = Yup.object().shape({
  name: Yup.string()
    .required("Addon name is required")
    .min(3, "Addon name must be at least 3 characters"),

  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),

  isActive: Yup.string().required("Is Active is required"),
});
