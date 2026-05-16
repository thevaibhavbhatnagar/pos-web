import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { usePermissionStore } from "../store/use-permission-store";

/**
 * A hook that syncs the user's modules from React Query (Server State)
 * to the Zustand Permission Store (Client UI State).
 */
export const useSyncPermissions = () => {
  const { data, isLoading, error } = useCurrentUser();
  const setPermissions = usePermissionStore((state) => state.setPermissions);

  useEffect(() => {
    if (data?.modules) {
      setPermissions(data.modules);
    }
  }, [data, setPermissions]);

  return { 
    isLoading,
    error,
    isLoaded: !!data?.modules 
  };
};
