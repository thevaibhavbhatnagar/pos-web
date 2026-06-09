import axios, { AxiosError } from "axios";
import { authToken } from "./authToken";
import apiEndpoints from "./endpoints";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 60000,
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
// });

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 60000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
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

axiosInstance.interceptors.request.use(
  async (config) => {
    const url = config.url ?? "";
    const isAuthRequest =
      url.includes(apiEndpoints.authentication.login) ||
      url.includes(apiEndpoints.authentication.loginVerify) ||
      url.includes(apiEndpoints.authentication.resendLoginVerification);

    if (isAuthRequest) {
      delete config.headers.Authorization;
      return config;
    }

    const token = await authToken();
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    //these requests should NOT trigger logout
    const isAuthRequest =
      url.includes(apiEndpoints.authentication.login) ||
      url.includes(apiEndpoints.authentication.loginVerify);
    const isSessionValidationRequest = url.includes(
      apiEndpoints.system.session,
    );

    // logout ONLY for protected APIs
    if (status === 401 && !isAuthRequest && !isSessionValidationRequest) {
      await handleUnauthorized();
    }

    // 403 -> standardized response
    if (status === 403) {
      return Promise.resolve({
        data: {
          success: false,
          statusCode: 403,
          message: error.response?.data?.message || "Access denied",
          data: null,
        },
      });
    }

    if (!error.response) {
      console.log("AXIOS ERROR", {
        code: error.code,
        message: error.message,
        config: error.config,
      });

      return Promise.reject(error);
    }

    console.error("Axios error:", error);
    return Promise.reject(error);
  },
);

export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response || isServerUnavailableStatus(error.response.status);
  }
  if (error instanceof Error) {
    return (
      error.message.toLowerCase().includes("network error") ||
      error.message.toLowerCase().includes("unreachable") ||
      error.message.toLowerCase().includes("failed to fetch")
    );
  }
  return false;
}

export function isServerUnavailableStatus(status?: number): boolean {
  return status === 502 || status === 503 || status === 504;
}

export function handleAxiosError(
  error: unknown,
  defaultMessage: string = "An unexpected error occurred. Please try again.",
): string {
  if (isNetworkError(error)) {
    return "Unable to connect to the server. Please check your internet connection or if the backend is running.";
  }

  if (error instanceof AxiosError) {
    return error.response?.data?.message || defaultMessage;
  }

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
