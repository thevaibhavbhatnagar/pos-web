"use client";

import { useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { hasPermission } from "../utils/hasPermission";

export const usePermission = (permissionKey: string) => {
  const { data, isLoading } = useCurrentUser();

  const allowed = useMemo(() => {
    if (!data?.modules) return false;
    return hasPermission(data.modules, permissionKey);
  }, [data, permissionKey]);

  return {
    allowed,
    isLoading,
  };
};
