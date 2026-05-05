import { useState } from "react";
import { useFormik } from "formik";

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { toast } from "@heroui/react";
import { ProductFormType } from "@/types/product/form";
import { ProductListType } from "@/types/product/list";
import { productFormValidation } from "@/validations/product-form.validation";

type Props = {
  product?: ProductFormType | undefined;
  onResetToAdd?: () => void;
  onSuccess?: () => void;
};

// Define the structure of form values
interface useProductFormValues {
  id?: string;
  name: string;
  price: string;
  isKotRequired: string;
  categoryId?: string;
  isActive: string;
}

const useProductForm = ({ product, onResetToAdd, onSuccess }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize Formik for user form handling
  const useProductFormik = useFormik<useProductFormValues>({
    initialValues: {
      name: product?.name ?? "",
      price: product?.price ?? "",
      isKotRequired: product?.isKotRequired ?? "true",
      categoryId: product?.categoryId ?? "",
      isActive: product?.isActive ?? "true",
    }, // Form initial values
    enableReinitialize: true, // Reinitialize when initialValues change
    validationSchema: productFormValidation, // Yup validation schema
    onSubmit: async (values) => {
      setErrorMessage(null); // Clear previous errors

      try {
        // Clear any previous error messages
        setErrorMessage(null);

        // Build payload
        const payload = {
          name: values.name ?? "",
          price: Number(values.price) ?? "",
          isKotRequired: values.isKotRequired === "true" ? true : false,
          categoryId: values.categoryId ?? "",
          isActive: values.isActive === "true" ? true : false,
        };

        let response = null;

        if (product?.id) {
          //  UPDATE (PATCH)
          response = await axiosInstance
            .patch(`${apiEndpoints.product.update}/${product?.id}`, payload)
            .catch(() => null);
        } else {
          //  CREATE (POST)
          response = await axiosInstance
            .post(apiEndpoints.product.create, payload)
            .catch(() => null);

          //  Show success toast once
          toast.success(response?.data?.message);

          // Reset the form ONLY after creating new
          useProductFormik.resetForm();
        }

        // Tell parent we switched back to add mode
        // onResetToAdd?.();

        // Optional callback
        onSuccess?.();
      } catch (error: unknown) {
        // Extract readable error message
        const message = handleAxiosError(error);

        setErrorMessage(message); // Set local error message

        // Display error toast
        toast.danger(message ?? "An error occurred");
      }
    },
  });

  return { useProductFormik, errorMessage };
};

export default useProductForm;
