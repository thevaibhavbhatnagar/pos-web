"use client";

import React from "react";
import { FieldError, InputOTP as HeroInputOTP, Label, Link } from "@heroui/react";

interface Props {
    label?: string;
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    errorMessage?: string;
    description?: string;
    className?: string;
    isDisabled?: boolean;
    email?: string;
    onResend?: () => void;
}

export default function InputOTP({
    label = "",
    length = 6,
    value,
    onChange,
    error = false,
    errorMessage,
    description = "We've sent a verification code",
    className = "w-full",
    isDisabled = false,
    email,
    onResend,
}: Props) {
    const firstGroup = Math.ceil(length / 2);
    const secondGroup = length - firstGroup;

    return (
        <div className={`flex w-full flex-col gap-5 ${className}`}>
            {/* Header */}

            {label &&
                <div className="flex flex-col gap-1">
                    <Label>{label}</Label>
                    <p className="text-sm text-muted-foreground">
                        {email ? `We've sent a code to ${email}` : description}
                    </p>
                </div>
            }

            {/* Resend */}
            <div className="flex justify-between ">
                <p className="text-sm text-primary-foreground">
                    Didn&apos;t receive a code?
                </p>

                <Link
                    href="#"
                    onPress={onResend}
                    className="cursor-pointer text-primary-foreground underline"
                >
                    Resend
                </Link>
            </div>


            <HeroInputOTP
                maxLength={length}
                value={value}
                onChange={onChange}
                isInvalid={error}
                isDisabled={isDisabled}
                className="flex flex-col items-start"
            >
                <HeroInputOTP.Group className="flex w-full gap-2 ">
                    {Array.from({ length }).map((_, index) => (
                        <HeroInputOTP.Slot
                            key={index}
                            index={index}
                            className="flex-1 h-12 rounded-2xl border border-grey-200"
                        />
                    ))}
                </HeroInputOTP.Group>
                {error && errorMessage && (
                    <FieldError>{errorMessage}</FieldError>
                )}

            </HeroInputOTP>



        </div>
    );
}