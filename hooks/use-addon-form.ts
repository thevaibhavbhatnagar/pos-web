import { useState } from "react";
import { useFormik } from "formik"; 

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { addonFormValidation } from "@/validations/addon-form.validation"; 
import { AddonListType } from "@/types/addon/list";
import { toast } from "@heroui/react";
import { AddonFormType } from "@/types/addon/form";

type Props = {
    addon?: AddonFormType | undefined;
    onResetToAdd?: () => void;
    onSuccess?: () => void;
};

interface useAddonFormValues {
    id?: string;
    name: string; 
    price: string;
    isActive: string;
}

const useAddonForm = ({ addon, onResetToAdd, onSuccess }: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const useAddonFormik = useFormik<useAddonFormValues>({
        initialValues: { 
            name: addon?.name ?? "", 
            price: addon?.price ?? "",
            isActive: addon?.isActive ?? "true",
        },
        enableReinitialize: true,
        validationSchema: addonFormValidation,
        onSubmit: async (values) => {
            setErrorMessage(null);

            try {
                const payload = {
                    name: values.name ?? "", 
                    price: Number(values.price ?? 0),
                    isActive: values.isActive === "true",
                };

                let response = null;

                if (addon?.id) {
                    // UPDATE (PATCH)
                    response = await axiosInstance.patch(`${apiEndpoints.addon.update}/${addon?.id}`, payload);
                    toast.success(response?.data?.message || "Addon updated successfully");
                } else {
                    // CREATE (POST)
                    response = await axiosInstance.post(apiEndpoints.addon.create, payload);
                    toast.success(response?.data?.message || "Addon created successfully");
                    useAddonFormik.resetForm();
                }

                onResetToAdd?.();
                onSuccess?.();
            } catch (error: unknown) {
                const message = handleAxiosError(error);
                setErrorMessage(message);
                toast.danger(message ?? "An error occurred");
            }
        },
    });

    return { useAddonFormik, errorMessage };
};

export default useAddonForm;
