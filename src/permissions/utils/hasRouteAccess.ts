import { GroupedModule } from "../types/permission.types";

export const hasRouteAccess = (
  modules: GroupedModule[],
  pathname: string,
): boolean => {
  for (const mod of modules) {
    if (mod.url && pathname.startsWith(mod.url)) {
      return mod.permissions?.length > 0;
    }

    if (mod.children?.length) {
      if (hasRouteAccess(mod.children, pathname)) return true;
    }
  }
  return false;
};
