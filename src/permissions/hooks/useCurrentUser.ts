import { useQuery } from "@tanstack/react-query";
import { getSession, useSession } from "next-auth/react";
import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";

export const useCurrentUser = () => {
  const { status } = useSession();

  return useQuery({
    queryKey: ["me"],
    enabled: status === "authenticated",
    // queryFn: async () => {
    //   const { data } = await axiosInstance.get(apiEndpoints.authentication.me);
    //   return data;
    // },

    queryFn: async () => {
      console.log("calling me api");

      const session = await getSession();

      console.log("session", session);

      const { data } = await axiosInstance.get(apiEndpoints.authentication.me);

      return data;
    },
  });
};
