import { useState } from "react";
import { useFormik } from "formik"; 

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { userFormValidation } from "@/validations/user-form.validation";
import { UserFormType } from "@/types/user/form";
import { UserListType } from "@/types/user/list";
import { toast } from "@heroui/react";

type Props = {
    user?: UserFormType | undefined;
    onResetToAdd?: () => void;
    onSuccess?: () => void;
};


// Define the structure of form values
interface useUserFormValues {
    id?: string;
    email: string;
    name: string;
    // type: string;
    role: string;
    branchId: string;
    // mobileNumber: string; 
    password: string;
}


const useUserForm = ({ user, onResetToAdd, onSuccess }: Props) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Initialize Formik for user form handling
    const useUserFormik = useFormik<useUserFormValues>({
        initialValues: {
            // type: user?.type ?? "",
            role: user?.role ?? "",
            name: user?.name ?? "",
            email: user?.email ?? "",
            branchId: user?.branchId ?? "",
            // mobileNumber: user?.mobileNumber ?? "", 
            password: user?.password ?? "",
        },                   // Form initial values
        enableReinitialize: true,            // Reinitialize when initialValues change
        validationSchema: userFormValidation,                // Yup validation schema
        onSubmit: async (values) => {

            setErrorMessage(null);           // Clear previous errors

            try {

                // Clear any previous error messages
                setErrorMessage(null);

                // Build payload
                const payload: Partial<UserListType> = {
                    // type: values.type ?? "",
                    roleId: values.role ?? "",
                    name: values.name ?? "",
                    email: values.email ?? "",
                    branchId:values.branchId ?? "",
                    // mobileNumber: values.mobileNumber ?? "",
                };

                //  Only send password if user typed it
                if (values.password?.trim()) {
                    payload.password = values.password;
                }

                let response = null;

                if (user?.id) {
                    //  UPDATE (PATCH)
                    response = await axiosInstance.patch(`${apiEndpoints.user.update}/${user.id}`, payload).catch(() => null);

                    //  Show success toast once
                    toast.success(response?.data?.message );

                } else {
                    //  CREATE (POST)
                    response = await axiosInstance.post(apiEndpoints.user.create, payload).catch(() => null);

                    //  Show success toast once
                    toast.success(response?.data?.message );

                    // Reset the form ONLY after creating new
                    useUserFormik.resetForm();
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

    return { useUserFormik, errorMessage };
};

export default useUserForm;
