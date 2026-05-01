import { Metadata } from "next"; // Import Metadata type for Next.js App Router
import Login from "@/app/(public)/auth/login/_components";
import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";

// Define metadata for SEO and page info
export const metadata: Metadata = {
    title: "Login | POS Web",
    description: "Log in to access your Dashflow account securely.",
};

export interface BranchListType {
    srNo?: Number;
    id: string;
    name: string;
}

// Force dynamic rendering (disables Next.js static optimization)
export const dynamic = "force-dynamic";


export default async function Page() {

    // Call backend APIs in parallel to fetch master data
    const response = await axiosInstance.get(apiEndpoints.branch.lookup);

    // Safely extract branch list from API response
    const branchList: BranchListType[] = response?.data?.data || [];

    // Map API branches, skipping entries with undefined IDs
    const branches: { label: string; value: string }[] =
        branchList.reduce<{ label: string; value: string }[]>((acc, item) => {
            if (item.id) {
                acc.push({ label: item.name, value: item.id });
            }
            return acc;
        }, []);


    return (
        // Full-height container with white text
        <div className="flex text-white h-screen items-center">
            {/* Render Login Component */}
            <Login branches={branches} />
        </div>
    );
}
