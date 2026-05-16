"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";

import axiosInstance from "@/utils/axiosInstance";

const SessionValidator = () => {
  useEffect(() => {
    const validateSession = async () => {
      try {
        await axiosInstance.get(
          `${window.location.origin}/api/session/validate`,
        );
      } catch (error) {
        console.error("SESSION INVALID:", error);

        await signOut({
          redirect: false,
        });

        const message =
          axios.isAxiosError(error) &&
          error.response?.status === 503
            ? "server_unreachable"
            : "session_invalid";

        window.location.href = `/auth/login?error=${message}`;
      }
    };

    validateSession();
  }, []);

  return null;
};

export default SessionValidator;
