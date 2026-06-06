const apiEndpoints = {
  authentication: {
    login: "/v1/auth/login",
    loginVerify: "/v1/auth/login/verify-otp",
    resendLoginVerification: "/v1/customer/auth/signin/request",

    signup: "/v1/auth/signup",
    signupVerify: "/v1/auth/signup/verify-otp",

    forgotPasswordRequest: "/v1/auth/forgot-password/request",
    forgotPasswordVerification: "/v1/auth/forgot-password/verify",
    forgotPasswordReset: "/v1/auth/forgot-password/change",
    me: "/v1/auth/me",
  },
  role: {
    create: "/v1/roles",
    list: "/v1/roles",
    update: (roleId: string) => `/v1/roles/${roleId}`,
    delete: "/v1/roles",

    permissionsbyRoleId: (roleId: string) => `/v1/roles/${roleId}`,
  },
  permission: {
    list: "/v1/permissions",
  },
  user: {
    create: "/v1/users",
    list: "/v1/users",
    update: "/v1/users",
    delete: "/v1/users",
  },
  branch: {
    create: "/v1/branches",
    list: "/v1/branches",
    update: "/v1/branches",
    delete: "/v1/branches",

    lookup: "/v1/branches/lookup",
  },
  category: {
    create: "/v1/categories",
    list: "/v1/categories",
    update: "/v1/categories",
    delete: "/v1/categories",

    lookup: "/v1/categories/lookup",
  },
  product: {
    create: "/v1/products",
    list: "/v1/products",
    update: "/v1/products",
    delete: "/v1/products",

    upload: "/v1/products/upload",

    lookup: "/v1/products/lookup",

    getProductsByCategory: (categoryId: string) =>
      `/v1/products/category?category_id=${categoryId}`,
  },
  order: {
    create: "/v1/orders",
    list: "/v1/orders",
    update: "/v1/orders",
    delete: "/v1/orders",

    details: (orderId: string) => `/v1/orders/${orderId}`,
    lookup: "/v1/orders/lookup",
  },
  kot: {
    create: "/v1/kots",
    list: "/v1/kots",
    update: "/v1/kots",
    delete: "/v1/kots",

    details: (kotId: string) => `/v1/kots/${kotId}`,
    lookup: "/v1/kots/lookup",
  },
  dashboard: {
    stats: "/v1/dashboard",
  },
  reports: {
    productSales: (branchId: string) => `/v1/reports/products/${branchId}`,
  },
  system: {
    health: "/v1/health",
    session: "/v1/session",
  },
};
export default apiEndpoints;
