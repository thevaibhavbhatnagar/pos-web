"use client";

import { hasPermission } from "../utils/hasPermission";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function PermissionGate({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const { data } = useCurrentUser();

  if (!data) return null;

  const allowed = hasPermission(data.modules, permission);

  if (!allowed) return null;

  return <>{children}</>;
}
