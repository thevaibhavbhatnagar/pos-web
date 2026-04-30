interface Branches {
  id: string;
  srNo: string;
  name: string;
  board: string;
  companyId: string;
  company: {
    id: string;
    name: string;
  };
  createdAt: string;
}
