import { Metadata } from "next"; // Import Metadata type for Next.js App Router 
import SignUp from "./_components";

// Define metadata for SEO and page info
export const metadata: Metadata = {
    title: "Sign Up | Dashflow",
    description: "Log in to access your Dashflow account securely.",
};

export default function Page() {
    return (
        // Full-height container with white text
        <div className="flex text-white h-screen items-center">
            {/* Render Login Component */}
            <SignUp />
        </div>
    );
}
