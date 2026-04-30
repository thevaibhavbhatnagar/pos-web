import { GroupedModule } from "../types/permission.types";

export const hasPermission = (
  modules: GroupedModule[],
  key: string,
): boolean => {
  for (const mod of modules) {
    if (mod.permissions?.some((p) => p.key === key)) return true;

    if (mod.children?.length) {
      if (hasPermission(mod.children, key)) return true;
    }
  }
  return false;
};
