import type { Metadata } from "next";
import ForgotPassword from '@/app/(public)/auth/forgot-password/_components';

/**
 * Metadata for the Forgot Password page.
 * Helps improve SEO and page information.
 */
export const metadata: Metadata = {
    title: 'Forgot Password | POS Web', // Title displayed in the browser tab.
    description: 'Reset your password easily with our secure process.', // Meta description for search engines.
};

// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";

/**
 * Forgot Password Page Component.  
 * Renders the ForgotPassword component within a full-screen layout.
 */
export default async function Page() {
    return (
        <div className="flex text-white h-screen items-center">
           <ForgotPassword />
        </div>
    );
}