"use client";

import { usePermissionStore } from "../store/use-permission-store";

/**
 * Hook to check if the current user has a specific permission.
 * Now uses Zustand for synchronous access and better performance.
 */
export const usePermission = (permissionKey: string) => {
  const allowed = usePermissionStore((state) => state.can(permissionKey));
  const isLoaded = usePermissionStore((state) => state.isLoaded);

  return {
    allowed,
    isLoading: !isLoaded,
  };
};
