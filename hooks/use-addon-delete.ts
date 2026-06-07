import { useState } from "react"; 
import { useRouter } from "next/navigation";

import apiEndpoints from "@/utils/endpoints";
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance";
import { toast } from "@heroui/react";

type Props = {
     onOpenChange: (open: boolean) => void;
     onResetToAdd?: () => void;
}

const useAddonDelete = ({ onOpenChange, onResetToAdd }: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const onDelete = async (id: string | undefined) => {
        if (!id) return;

        try {
            setErrorMessage(null); 
            
            const response = await axiosInstance.delete(`${apiEndpoints.addon.delete}/${id}`);
            
            toast.success(response?.data?.message || "Addon deleted successfully");

            onOpenChange(false);
            router.refresh();
            onResetToAdd?.();

        } catch (error: any) {
            const message = handleAxiosError(error);
            setErrorMessage(message);
            toast.danger(message ?? "");
        }
    };

    return { onDelete, errorMessage };
};

export default useAddonDelete;
