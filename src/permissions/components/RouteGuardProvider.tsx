"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePermissionStore } from "../store/use-permission-store";

/**
 * RouteGuardProvider protects routes based on user permissions.
 * It uses the optimized Zustand store for instant route access checks.
 */
export default function RouteGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoaded = usePermissionStore((state) => state.isLoaded);
  const hasAccess = usePermissionStore((state) => state.hasAccess);

  useEffect(() => {
    // Only check once permissions are loaded in the store
    if (!isLoaded) return;

    const allowed = hasAccess(pathname);

    if (!allowed) {
      router.replace("/unauthorized");
    }
  }, [pathname, isLoaded, hasAccess, router]);

  return <>{children}</>;
}
