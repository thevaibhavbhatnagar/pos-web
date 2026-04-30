"use client"; // Enables client-side rendering for this component

import React, { useState } from "react";
import LoginForm from "@/app/(public)/auth/login/_components/login-form"; // Importing the LoginForm component
import LoginVerificationForm from "@/app/(public)/auth/login/_components/login-verification-form"; // Importing the LoginVerificationForm component
import AuthCard from "../../_components";

// Main Login component
const Login: React.FC = () => {
    // State to manage the currently displayed component (LoginForm or LoginVerificationForm)
    const [component, switchComponent] = useState<"LOGIN_COMPONENT" | "LOGIN_VERIFICATION_COMPONENT">("LOGIN_COMPONENT");
    // State to store the user's email or phone number entered during login
    const [email, setEmail] = useState<string>("");


    const [password, setPassword] = useState<string>("");

    return (
        <AuthCard>
            {/* Render the LoginForm if the current component is "LOGIN_COMPONENT" */}
            {component === "LOGIN_COMPONENT" && (<LoginForm setEmail={setEmail} switchComponent={switchComponent} setPassword={setPassword} />)}

            {/* Render the LoginVerificationForm component if the current component is "OTP_COMPONENT" */}
            {component === "LOGIN_VERIFICATION_COMPONENT" && <LoginVerificationForm email={email} password={password} />}
        </AuthCard>
    );
};

export default Login;