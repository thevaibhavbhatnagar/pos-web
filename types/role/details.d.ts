export interface RoleDetailsType {
    id?: string;
    role: string;
    permissions: {
        permissionId: string,
        permission: {
            id: string,
            key: string,
            description: string,
        }
    }[]
}