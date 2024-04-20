import {
  Company,
  CompanyDetails,
  Params,
} from "../components/components.types";

export type GetCompaniesResponse = {
  data: Company[];
  total: number;
  pages: number;
};
export type GetCompanyByIdResponse = {
  data: Company;
};

export type GetCompanyDetailsByIdResponse = {
  data: CompanyDetails[];
};

export const BASE_URL = "https://617c09aad842cf001711c200.mockapi.io/v1";

const cache: any = {};

const handleResponseError = (response: Response) => {
  if (response.status === 500) {
    throw new Error("Internal Server Error: Please try again later.");
  }
  throw new Error(response.statusText);
};

export const getCompanies = async (
  params: Params
): Promise<GetCompaniesResponse> => {
  try {
    const urlSearchParams = new URLSearchParams();
    if (params.search) urlSearchParams.append("search", params.search);
    if (params.sortby) urlSearchParams.append("sortby", params.sortby);
    if (params.order) urlSearchParams.append("order", params.order);
    urlSearchParams.append("page", String(params.page || 1));
    urlSearchParams.append("limit", String(params.limit || 10));

    const url = `${BASE_URL}/companies?${urlSearchParams.toString()}`;
    if (cache[url]) return cache[url];

    const response = await fetch(url);
    if (!response.ok) handleResponseError(response);

    const data = await response.json();
    cache[url] = data;

    data.pages = Math.ceil(data.total / params.limit);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyById = async (
  id: string
): Promise<GetCompanyByIdResponse> => {
  try {
    const url = `${BASE_URL}/companies/${id}`;
    if (cache[url]) return cache[url];

    const response = await fetch(url);
    if (!response.ok) handleResponseError(response);

    const data = await response.json();
    cache[url] = data;

    return data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDetailsById = async (
  id: string
): Promise<GetCompanyDetailsByIdResponse> => {
  try {
    const url = `${BASE_URL}/companies/${id}/details`;
    if (cache[url]) return cache[url];

    const response = await fetch(url);
    if (!response.ok) handleResponseError(response);

    const data = await response.json();
    cache[url] = data;

    return data;
  } catch (error) {
    throw error;
  }
};
