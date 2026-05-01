export type ModuleType = {
  id: string;
  name: string;
  key: string;
  order: number;
  parentId: string | null;
};

export type PermissionType = {
  id: string;
  key: string;
  description: string | null;
};


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
  parentId: string | null;
  permissions: PermissionItem[];
  children: GroupedModule[];
};


export type PermissionsByModuleType = {
  module: ModuleType;
  permissions: PermissionType[];
  children: GroupedModule[];
};
