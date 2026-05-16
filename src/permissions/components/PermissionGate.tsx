"use client";

import { usePermissionStore } from "../store/use-permission-store";

/**
 * Component that only renders its children if the user has the required permission.
 */
export default function PermissionGate({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const allowed = usePermissionStore((state) => state.can(permission));
  const isLoaded = usePermissionStore((state) => state.isLoaded);

  if (!isLoaded || !allowed) return null;

  return <>{children}</>;
}
