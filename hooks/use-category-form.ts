import { useState } from "react";
import { useFormik } from "formik"; 

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { categoryFormValidation } from "@/validations/category-form.validation"; 
import { CategoryListType } from "@/types/category/list";
import { toast } from "@heroui/react";
import { CategoryFormType } from "@/types/category/form";

type Props = {
    category?: CategoryFormType | undefined;
    onResetToAdd?: () => void;
    onSuccess?: () => void;
};


// Define the structure of form values
interface useCategoryFormValues {
    id?: string;
    name: string; 
    isActive: string;
}


const useCategoryForm = ({ category, onResetToAdd, onSuccess }: Props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Initialize Formik for user form handling
    const useCategoryFormik = useFormik<useCategoryFormValues>({
        initialValues: { 
            name: category?.name ?? "", 
            isActive: category?.isActive ?? "true",
        },                   // Form initial values
        enableReinitialize: true,            // Reinitialize when initialValues change
        validationSchema: categoryFormValidation,                // Yup validation schema
        onSubmit: async (values) => {

            setErrorMessage(null);           // Clear previous errors

            try {

                // Clear any previous error messages
                setErrorMessage(null);

                // Build payload
                const payload: Partial<CategoryListType> = {
                    name: values.name ?? "", 
                    isActive: values.isActive === "true" ? true : false ,
                };

                let response = null;

                if (category?.id) {
                    //  UPDATE (PATCH)
                    response = await axiosInstance.patch(`${apiEndpoints.category.update}/${category?.id}`, payload).catch(() => null);
                    
                    //  Show success toast once
                    toast.success(response?.data?.message );


                } else {
                    //  CREATE (POST)
                    response = await axiosInstance.post(apiEndpoints.category.create, payload).catch(() => null);

                    //  Show success toast once
                    toast.success(response?.data?.message );

                    // Reset the form ONLY after creating new
                    useCategoryFormik.resetForm();
                }



                // Tell parent we switched back to add mode
                onResetToAdd?.();

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

    return { useCategoryFormik, errorMessage };
};

export default useCategoryForm;
