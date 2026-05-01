export interface RoleFormType {
    id?: string; 
    role: string; 
    // permissions: string[]; 
    permissions: {
        permissionId: string,
        permission: {
            id: string,
            key: string,
            description: string,
        }
    }[]
}