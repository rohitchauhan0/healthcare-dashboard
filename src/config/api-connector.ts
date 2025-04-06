import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

// Create an Axios instance
export const axiosInstance = axios.create({});

// Define the API connector function
export const apiconnector = async <T>(
  method: Method,
  url: string,
  bodyData?: Record<string, unknown>,  // Replaced `any` with `unknown`
  headers?: Record<string, string>,
  params?: Record<string, string | number | boolean>
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || undefined,
    headers: headers || undefined,
    params: params || undefined
  };

  return axiosInstance(config);
};
