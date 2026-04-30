"use client"; // Enables client-side rendering for this component

import React, { useState } from "react";
import SignUpForm from "@/app/(public)/auth/sign-up/_components/signup-form"; // Importing the SignUpForm component
import SignUpVerificationForm from "@/app/(public)/auth/sign-up/_components/signup-verification-form"; // Importing the SignUpVerificationForm component
import AuthCard from "../../_components";

// Main SignUp component
const SignUp: React.FC = () => {
    // State to manage the currently displayed component (SignUpForm or SignUpVerificationForm)
    const [component, switchComponent] = useState<"SIGNUP_COMPONENT" | "SIGNUP_VERIFICATION_COMPONENT">("SIGNUP_COMPONENT");
    // State to store the user's email or phone number entered during login
    const [email, setEmail] = useState<string>("");


    const [password, setPassword] = useState<string>("");

    return (
        <AuthCard>
            {/* Render the SignUpForm if the current component is "SIGNUP_COMPONENT" */}
            {component === "SIGNUP_COMPONENT" && (<SignUpForm setEmail={setEmail} switchComponent={switchComponent} setPassword={setPassword} />)}

            {/* Render the SignUpVerificationForm component if the current component is "SIGNUP_VERIFICATION_COMPONENT" */}
            {component === "SIGNUP_VERIFICATION_COMPONENT" && <SignUpVerificationForm email={email} password={password} />}
        </AuthCard>
    );
};

export default SignUp;