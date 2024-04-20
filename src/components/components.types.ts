export type Company = {
  id: string;
  name: string;
  city: string;
  zipCode: string;
  streetName: string;
  logo: string;
  createdAt: string;
};

export type CompanyDetails = {
  catchPhrase: string;
  website: string;
  phoneNumber: string;
  id: string;
  companyId: string;
};

export type Params = {
  search: string;
  sortby: string;
  order: string;
  page: number;
  limit: number;
}