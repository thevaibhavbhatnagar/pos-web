// src/role/role.types.ts
export type PermissionItem = {
  id: string;
  key: string;
  description: string | null;
};

export type GroupedModule = {
  id: string;
  name: string;
  key: string;
  order: number;
  icon?: string;
  url?: string;
  parentId: string | null;
  permissions: PermissionItem[];
  children: GroupedModule[];
};

