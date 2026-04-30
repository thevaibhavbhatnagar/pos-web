import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const authToken = async (): Promise<string | null> => {
  // Client-side
  if (typeof window !== "undefined") {
    const session = await getSession();
    return (session as any)?.accessToken ?? null;
  }

  // Server-side
  const session = await getServerSession(authOptions);
  return (session as any)?.accessToken ?? null;
};


export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}