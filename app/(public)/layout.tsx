import Image from "next/image";

// import LoginRight from "@/public/assets/background.svg";
import Background from "@/public/assets/background";
import { ChartPie, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen justify-center items-center   ">
      <div className="absolute z-10 w-full max-w-7xl mx-auto h-full py-4">
        <div className="flex gap-2 items-center px-6">
          <ChartPie color="var(--primary)" size={30} />
          <Link href={"/"} className="text-xl font-bold">DashFlow</Link>
        </div>
      </div>
      <div className="relative z-10 w-full lg:w-[50%] h-full">{children}</div>
      <div className="absolute inset-0 overflow-hidden">
        <Background className="absolute inset-0 w-full h-full scale-110" />
      </div>
    </div>
  );
}
