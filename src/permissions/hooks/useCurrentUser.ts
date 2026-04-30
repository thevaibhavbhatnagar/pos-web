import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";

export const useCurrentUser = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ["me"],
    enabled: status === "authenticated",
    queryFn: async () => {
      const { data } = await axiosInstance.get(apiEndpoints.authentication.me);
      return data;
    },
  });
};
