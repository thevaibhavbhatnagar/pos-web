"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";

const SessionValidator = () => {
  useEffect(() => {
    const validateSession = async () => {
      try {
        await axiosInstance.get(
          apiEndpoints.authentication.me
        );
      } catch (error) {
        console.error("SESSION INVALID:", error);

        await signOut({
          redirect: false,
        });

        window.location.href =
          "/auth/login?error=server_unreachable";
      }
    };

    validateSession();
  }, []);

  return null;
};

export default SessionValidator;
