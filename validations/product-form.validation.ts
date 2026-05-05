import * as Yup from "yup";

export const productFormValidation = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(3, "Product name must be at least 3 characters"),

  price: Yup.string()
    .required("Product price is required")
    .min(2, "Product price must be at least 2 characters"),

  isKotRequired: Yup.string().required("Is KOT Required is required"),
  
  categoryId: Yup.string().required("Category is required"),

  isActive: Yup.string().required("Is Active is required"),
});
