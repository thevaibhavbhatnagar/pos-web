import axios, { AxiosError } from 'axios';
import { authToken } from './authToken';
import apiEndpoints from './endpoints';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});


const handleUnauthorized = async () => {
  // Client-side
  if (typeof window !== "undefined") {
    const { signOut } = await import("next-auth/react");
    await signOut({ callbackUrl: "/auth/login" });
    return;
  }

  // Server-side → redirect to silent client logout
  const { redirect } = await import("next/navigation");
  redirect("/auth/silent-logout");
};


axiosInstance.interceptors.request.use(async (config) => {
  const token = await authToken();
  config.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return config;
}, (error) => Promise.reject(error));

axiosInstance.interceptors.response.use((response) => response, async (error) => {

  const status = error.response?.status;
  const url = error.config?.url ?? "";

  //these requests should NOT trigger logout
  const isAuthRequest =
    url.includes(apiEndpoints.authentication.login) || 
    url.includes(apiEndpoints.authentication.loginVerify) 

  // logout ONLY for protected APIs
  if (status === 401 && !isAuthRequest) {
    await handleUnauthorized();
  }

  console.error('Axios error:', error);
  return Promise.reject(error);
});

export function handleAxiosError(error: unknown, defaultMessage: string = "An unexpected error occurred. Please try again."): string {
  if (error instanceof AxiosError) {
    // Handle AxiosError: Check for response-specific error messages
    return error.response?.data?.message || defaultMessage;
  }

  // Handle other errors
  return defaultMessage;
}
export function isConflictWithContext(error: unknown): boolean {
  if (error instanceof AxiosError) {
    // Return true if the error has a 409 Conflict status
    return error.response?.status === 409;
  }
  // Return false if it's not an AxiosError or the status is not 409
  return false;
}

export default axiosInstance;
