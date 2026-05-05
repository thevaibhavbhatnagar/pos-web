import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "@heroui/react";

// import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";

import { branchFormValidation } from "@/validations/branch-form.validation";

import { BranchFormType } from "@/types/branch/form";
import apiEndpoints from "@/utils/endpoints";

type Props = {
    branch?: BranchFormType | undefined;
    onResetToAdd?: () => void;
    onSuccess?: () => void;
};


// Define the structure of form values
interface useBranchFormValues {
    id?: string; 
    name: string;
}


const useBranchForm = ({ branch, onResetToAdd, onSuccess }: Props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Initialize Formik for branch form handling
    const useBranchFormik = useFormik<useBranchFormValues>({
        initialValues: { 
            name: branch?.name ?? "",
        },                                    // Form initial values
        enableReinitialize: true,            // Reinitialize when initialValues change
        validationSchema: branchFormValidation,                // Yup validation schema
        onSubmit: async (values) => {

            setErrorMessage(null);           // Clear previous errors

            try {

                const payload = { 
                    name: values?.name, 
                }

                if (branch?.id) { 

                    // Send POST request to update the existing branch ID
                    const response = await axiosInstance.patch(`${apiEndpoints.branch.update}/${branch.id}`, payload);

                    //  Show success toast once
                    toast.success(response?.data?.message );

                    // Tell parent we switched back to add mode
                    onResetToAdd?.();

                } else { 
                    // Send POST request to create a new branch 
                    const response = await axiosInstance.post(`${apiEndpoints.branch.create}`, payload);

                    //  Show success toast once
                    toast.success(response?.data?.message );

                    // Reset the form ONLY after creating new
                    useBranchFormik.resetForm();
                }
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

    return { useBranchFormik, errorMessage };
};

export default useBranchForm;
