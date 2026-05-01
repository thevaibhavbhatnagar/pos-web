import { useState } from "react";
import { useFormik } from "formik"; 

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { roleFormValidation } from "@/validations/role-form.validation"; 
import { toast } from "@heroui/react";


type Props = {
    onResetToAdd?: () => void;
    onSuccess?: () => void;
};


// Define the structure of form values
interface useRoleFormValues {
    id?: string;
    role: string; 
    permissions: {
        permissionId: string,
        permission: {
            id: string,
            key: string,
            description: string,
        }
    }[]
}


const useRoleForm = ({ onResetToAdd, onSuccess }: Props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Initialize Formik for permission form handling
    const useRoleFormik = useFormik<useRoleFormValues>({
        initialValues: {
            role: "",
            permissions: [],
        },                   // Form initial values
        enableReinitialize: true,            // Reinitialize when initialValues change
        validationSchema: roleFormValidation,                // Yup validation schema
        onSubmit: async (values) => {

            setErrorMessage(null);           // Clear previous errors

            try {

                // Clear any previous error messages
                setErrorMessage(null);

                // Build payload
                const payload = {
                    name: values.role ?? "",
                    permissionIds: values.permissions.map((p) => p.permissionId),
                };

                //  CREATE (POST)
                const response =  await axiosInstance.post(apiEndpoints.role.create, payload).catch(() => null);

                //  Show success toast once
                toast.success(response?.data?.message ?? "Success");

                // Reset the form ONLY after creating new
                useRoleFormik.resetForm();

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

    return { useRoleFormik, errorMessage };
};

export default useRoleForm;