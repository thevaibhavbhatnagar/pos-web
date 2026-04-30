"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { hasRouteAccess } from "../utils/hasRouteAccess";

export default function RouteGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();

  useEffect(() => {
    if (isLoading || !data) return;

    const allowed = hasRouteAccess(data.modules, pathname);

    if (!allowed) {
      router.replace("/unauthorized");
    }
  }, [pathname, data, isLoading]);

  return <>{children}</>;
}
