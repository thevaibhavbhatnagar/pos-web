"use client"; // Enables client-side rendering for this component

import React from "react";
import LoginForm from "@/app/(public)/auth/login/_components/login-form";
import AuthCard from "@/app/(public)/auth/_components";

// Main Login component
const Login: React.FC = () => {

    return (
        <AuthCard>
            <div className="flex flex-col gap-4 mb-6 text-center sm:text-left">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Sign In
                </h2>
                <p className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
                    Please enter your credentials to access your account
                </p>
            </div>
            <LoginForm />
        </AuthCard>
    );
};

export default Login;