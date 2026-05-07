import { useState } from "react";
import { toast } from "@heroui/react";
import { useRouter } from "next/navigation";

import apiEndpoints from "@/utils/endpoints"; // API endpoints configuration
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance"; // Configured Axios instance and error handler


type Props = {
     onOpenChange: (open: boolean) => void;
     onResetToAdd?:()=>void
}

const useOrderDelete = ({onOpenChange,onResetToAdd}:Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for storing error messages
    const router = useRouter()
    const onDelete = async (id: string | undefined) => {

        if (!id) return; // Prevent undefined/null ID calls

        try {
            // Clear any previous error 
            setErrorMessage(null); 
            
            const response = await axiosInstance.delete(`${apiEndpoints.order.delete}/${id}`);
            
            toast.success(response?.data?.message ?? "");

            onOpenChange(false);
            
            router.refresh();

            onResetToAdd?.();

        } catch (error: any) {
            // Handle and extract error message
            const message = handleAxiosError(error);
            
            // Set error message in state
            setErrorMessage(message);

            toast.danger(message ?? "");

        }
    };

    // Return the delete order function and the current error message for use within the component
    return { onDelete, errorMessage };
};

export default useOrderDelete;
