import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GroupedModule } from "../types/permission.types";

interface PermissionState {
  modules: GroupedModule[];
  permissionKeys: Set<string>; // Flattened keys for O(1) lookup
  allowedUrls: Set<string>;    // Flattened URLs for O(1) route checks
  isLoaded: boolean;
  // Actions
  setPermissions: (modules: GroupedModule[]) => void;
  clearPermissions: () => void;
  // Selector Helpers
  can: (permissionKey: string) => boolean;
  hasAccess: (pathname: string) => boolean;
}

/**
 * Helper to recursively extract all permission keys and allowed URLs
 */
const processModules = (
  modules: GroupedModule[], 
  keys = new Set<string>(), 
  urls = new Set<string>()
) => {
  modules.forEach((mod) => {
    // Add permission keys
    mod.permissions?.forEach((p) => keys.add(p.key));
    
    // Add URL if user has permissions in this module
    if (mod.url && mod.permissions?.length > 0) {
      urls.add(mod.url);
    }
    
    if (mod.children?.length) {
      processModules(mod.children, keys, urls);
    }
  });
  return { keys, urls };
};

export const usePermissionStore = create<PermissionState>()(
  devtools(
    (set, get) => ({
      modules: [],
      permissionKeys: new Set(),
      allowedUrls: new Set(),
      isLoaded: false,

      setPermissions: (modules) => {
        const { keys, urls } = processModules(modules);
        set({ modules, permissionKeys: keys, allowedUrls: urls, isLoaded: true });
      },

      clearPermissions: () => set({ 
        modules: [], 
        permissionKeys: new Set(), 
        allowedUrls: new Set(), 
        isLoaded: false 
      }),

      can: (permissionKey) => {
        return get().permissionKeys.has(permissionKey);
      },

      hasAccess: (pathname) => {
        // Optimized check: Exact match or starts with allowed URL
        // In a real POS, we might need more complex regex, but this matches your current logic
        const urls = get().allowedUrls;
        if (urls.has(pathname)) return true;
        
        // Fallback for sub-routes (e.g., /orders/new matching /orders)
        for (const url of urls) {
          if (pathname.startsWith(url)) return true;
        }
        return false;
      },
    }),
    { name: "PermissionStore" }
  )
);
