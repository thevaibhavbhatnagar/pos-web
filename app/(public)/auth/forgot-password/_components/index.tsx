"use client"; // Enables client-side rendering for this component

import React, { useState } from "react";

import ForgotPasswordRequestForm from "@/app/(public)/auth/forgot-password/_components/forgot-password-request-form"; // Step 1: User enters email or phone
import ForgotPasswordVerificationForm from "@/app/(public)/auth/forgot-password/_components/forgot-password-verification-form"; // Step 2: Verify OTP
import ResetPasswordForm from "@/app/(public)/auth/forgot-password/_components/reset-password-form"; // Step 3: Reset password
import AuthCard from "../../_components";

// Main Forgot Password component
const ForgotPassword: React.FC = () => {
    // State to manage the currently displayed component (step 1, 2, or 3)
    const [component, switchComponent] = useState<"FORGOT_PASSWORD_REQUEST" | "FORGOT_PASSWORD_VERIFICATION" | "RESET_PASSWORD">("FORGOT_PASSWORD_REQUEST");
    // State to store the user's email during password reset
    const [email, setEmail] = useState<string>("");
    // State to store the JWT token received for password reset verification
    const [token, setToken] = useState<string>("");

    return (
        <AuthCard>
            {/* Step 1: User enters email or phone */}
            {component === "FORGOT_PASSWORD_REQUEST" && (<ForgotPasswordRequestForm setEmail={setEmail} switchComponent={switchComponent} />)}

            {/* Step 2: User verifies OTP */}
            {component === "FORGOT_PASSWORD_VERIFICATION" && (<ForgotPasswordVerificationForm setToken={setToken} email={email} switchComponent={switchComponent} />)}

            {/* Step 3: User resets password */}
            {component === "RESET_PASSWORD" && (<ResetPasswordForm token={token} />)}
        </AuthCard>
    );
};

export default ForgotPassword;
