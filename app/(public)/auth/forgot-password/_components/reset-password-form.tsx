import React from 'react';
import useResetPassword from '@/hooks/use-reset-password';
import PasswordInput from '@/ui/password-input';
import Button from '@/ui/button';

interface Props {
    // JWT token provided for verifying the password reset request
    token: string;
};

// Component for handling the forgot password request form
const ResetPasswordForm: React.FC<Props> = ({ token }) => {
    // Custom hook to manage form state, validation, and submission for password reset
    const { useResetPasswordFormik } = useResetPassword(token);

    return (
        <div className="flex flex-col justify-center gap-4 px-8 ">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-base xl:text-xl font-bold text-center text-primary-foreground">
                        Reset Password
                    </h2>
                </div>
                <p className="text-sm md:text-base font-normal text-grey">
                    Please choose your new password
                </p>
            </div>

            <form onSubmit={useResetPasswordFormik.handleSubmit} className="w-full flex flex-col gap-6" method="POST">
                <PasswordInput label='Password' name="password" placeholder="Enter New password" value={useResetPasswordFormik.values.password} onChange={useResetPasswordFormik.handleChange}
                    error={!!useResetPasswordFormik.errors.password && !!useResetPasswordFormik.touched.password}
                    errorMessage={useResetPasswordFormik.errors.password}
                ></PasswordInput>

                <PasswordInput label='Confirm Password' name="confirmPassword" placeholder="Enter Confirm New Password" value={useResetPasswordFormik.values.confirmPassword} onChange={useResetPasswordFormik.handleChange}
                    error={!!useResetPasswordFormik.errors.confirmPassword && !!useResetPasswordFormik.touched.confirmPassword}
                    errorMessage={useResetPasswordFormik.errors.confirmPassword}
                ></PasswordInput>
                <Button type="submit"> Reset Password </Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm