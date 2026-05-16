import axiosInstance from "./axiosInstance";
import apiEndpoints from "./endpoints";

/**
 * Check if the backend is reachable and healthy.
 * @returns {Promise<any>}
 */
export const checkHealth = async () => {
  try {
    const response = await axiosInstance.get(apiEndpoints.system.health);
    return response.data;
  } catch (error) {
    console.error("Backend health check failed:", error);
    throw error;
  }
};
