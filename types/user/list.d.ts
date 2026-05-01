export interface UserListType {
    srNo?:Number;
    id:string;
    email: string;
    name: string;
    roleId: string;
    role: {
        id:string;
        name:string;        
    };
    branchId: string;
    branch:{
        id:string;
        name:string;
    };
    // type: string;
    mobileNumber: string; 
    password: string; 
}