"use client"; // Enables client-side rendering for this component

import React, { useState } from "react"; 
import { Tabs } from "@heroui/react";
import AdminLoginForm from "./admin-login-form";
import BranchLoginForm from "./branch-login-form";
import AuthCard from "../../_components";
// Main Login component
const Login: React.FC = () => {

    // State to store the user's email or phone number entered during login
    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    return (
        <AuthCard>
            <div className="flex flex-col gap-1 mb-6 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Welcome Back
                </h2>
                <p className="text-sm sm:text-base font-normal text-slate-500 dark:text-slate-400">
                    Please enter your credentials to access your account
                </p>
            </div>

            <Tabs className="w-full max-w-md">
                <Tabs.ListContainer>
                    <Tabs.List aria-label="Options" className="rounded-2xl p-1 bg-slate-100 dark:bg-zinc-800">
                        <Tabs.Tab id="admin">
                            Admin
                            <Tabs.Indicator />
                        </Tabs.Tab>
                        <Tabs.Tab id="branch">
                            Branch
                            <Tabs.Indicator />
                        </Tabs.Tab>
                    </Tabs.List>
                </Tabs.ListContainer>
                <Tabs.Panel className="pt-3" id="admin">
                    <AdminLoginForm setEmail={setEmail} setPassword={setPassword} />
                </Tabs.Panel>
                <Tabs.Panel className="pt-3" id="branch">
                    <BranchLoginForm setEmail={setEmail} setPassword={setPassword} />
                </Tabs.Panel>
            </Tabs>
        </AuthCard>
    );
};

export default Login;