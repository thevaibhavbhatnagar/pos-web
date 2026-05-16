"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SilentLogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/auth/login" });
  }, []);

  return null; // no UI
}
