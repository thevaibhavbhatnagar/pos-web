import { useState } from "react";
import { useFormik } from "formik"; 

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";

import { roleFormValidation } from "@/validations/role-form.validation";
import { RoleDetailsType } from "@/types/role/details";
import { toast } from "@heroui/react";


type Props = {
    role: RoleDetailsType;
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


const useRoleEditForm = ({ role, onResetToAdd, onSuccess }: Props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Initialize Formik for permission form handling
    const useRoleEditFormik = useFormik<useRoleFormValues>({
        initialValues: {
            role: role?.id ?? "",
            permissions: role?.permissions ?? [],
            
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

                if (role?.id) {

                    const response = await axiosInstance.patch(apiEndpoints.role.update(role.id), payload).catch(() => null);
                    //  Show success toast once
                    toast.success(response?.data?.message);

                    // Reset the form ONLY after creating new
                    useRoleEditFormik.resetForm();


                    // Optional callback
                    onSuccess?.();
                }


            } catch (error: unknown) {
                // Extract readable error message
                const message = handleAxiosError(error);

                setErrorMessage(message); // Set local error message

                // Display error toast
                toast.danger(message ?? "An error occurred");
            }
        },
    });

    return { useRoleEditFormik, errorMessage };
};

export default useRoleEditForm;