import { useState } from "react";

import apiEndpoints from "@/utils/endpoints"; // API endpoints configuration
import axiosInstance, { handleAxiosError } from "@/utils/axiosInstance"; // Configured Axios instance and error handler
import { toast } from "@heroui/react";

const useResendLoginOtp = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for storing error messages

    const resendOtp = async (email: string, password:string) => {
        try {
            setErrorMessage(null); // Clear any previous error

            // Rename email  to match API expectation
            const payload = { username: email, password:password };
            // Send POST request to resend OTP endpoint
            await axiosInstance.post(apiEndpoints.authentication.resendLoginVerification, payload);

        } catch (error: any) {
            // Handle and extract error message
            const message = handleAxiosError(error);
            // Set error message in state
            setErrorMessage(message);
            toast.danger(message);
        }
    };

    // Return the resendOtp function and the current error message for use within the component
    return { resendOtp, errorMessage };
};

export default useResendLoginOtp;
