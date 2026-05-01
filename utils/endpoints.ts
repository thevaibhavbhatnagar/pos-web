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
  publisher: {
    create: "/v1/publishers",
    list: "/v1/publishers",
    update: "/v1/publishers",
    delete: "/v1/publishers",
  },
  company: {
    create: "/v1/company",
    list: "/v1/company",
    update: "/v1/company",
    delete: "/v1/company",
  },
  branch: {
    create: "/v1/branches",
    list: "/v1/branches",
    update: "/v1/branches",
    delete: "/v1/branches",

    lookup:"/v1/branches/lookup"
  },
  class: {
    create: "/v1/class",
    list: "/v1/class",
    update: "/v1/class",
    delete: "/v1/class",
  },
  subject: {
    create: "/v1/subjects",
    list: "/v1/subjects",
    update: "/v1/subjects",
    delete: "/v1/subjects",
  },
  book: {
    create: "/v1/books",
    list: "/v1/books",
    update: "/v1/books",
    delete: "/v1/books",

    byPublisherId: (publisherId: string) =>
      `/v1/purchase-order/books?publisherId=${publisherId}`, // move this to purchase-order later if needed
    byId: (id: string) => `/v1/books/${id}`,
  },
  purchaseOrder: {
    create: "/v1/purchase-order",
    list: "/v1/purchase-order",
    update: "/v1/purchase-order",
    delete: "/v1/purchase-order",

    details: "/v1/purchase-order",

    getPoNumber: "/v1/purchase-order/next-number",
  },
  purchaseReturn: {
    create: "/v1/purchase-returns",
    list: "/v1/purchase-returns",
    update: "/v1/purchase-returns",
    delete: "/v1/purchase-returns",

    details: "/v1/purchase-returns",

    getPrNumber: "/v1/purchase-returns/next-number",
    byPublisherId: (publisherId: string) =>
      `/v1/purchase-returns/grns?publisherId=${publisherId}`, // move this to purchase-order later if needed
    byPurchaseOrderId: (publisherId: string) =>
      `/v1/purchase-returns/grns/${publisherId}`, // move this to purchase-order later if needed
  },
  grn: {
    create: "/v1/grns",
    list: "/v1/grns",
    update: "/v1/grns",
    delete: "/v1/grns",

    details: "/v1/grns",

    getGrnNumber: "/v1/grns/next-number",
    byPublisherId: (publisherId: string) =>
      `/v1/grns/purchase-orders?publisherId=${publisherId}`, // move this to purchase-order later if needed
    byPurchaseOrderId: (publisherId: string) =>
      `/v1/grns/purchase-orders/${publisherId}`, // move this to purchase-order later if needed
  },
  companyInvoice: {
    create: "/v1/company-invoice",
    list: "/v1/company-invoice",
    update: "/v1/company-invoice",
    delete: "/v1/company-invoice",
  },
  companyInvoiceReturn: {
    create: "/v1/company-invoice-return",
    list: "/v1/company-invoice-return",
    update: "/v1/company-invoice-return",
    delete: "/v1/company-invoice-return",
  },
  materialTransfer: {
    create: "/v1/material-transfer",
    list: "/v1/material-transfer",
    update: "/v1/material-transfer",
    delete: "/v1/material-transfer",
  },
  admin: {
    invoice: {
      create: "/v1-invoice",
      list: "/v1-invoice",
      update: "/v1-invoice",
      delete: "/v1-invoice",
    },
    invoiceOrder: {
      create: "/v1-invoice-return",
      list: "/v1-invoice-return",
      update: "/v1-invoice-return",
      delete: "/v1-invoice-return",
    },
  },
};
export default apiEndpoints;
