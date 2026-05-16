"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import axios from "axios";

import {
  handleAxiosError,
  isNetworkError,
} from "@/utils/axiosInstance";

const SessionValidator = () => {
  useEffect(() => {
    const validateSession = async () => {
      try {
        // Calls current Next.js app API route
        const response = await axios.get(`${window.location.origin}/api/session/validate`);

        if (response.status === 200) {
          return;
        }
      } catch (error) {
        console.error("SESSION INVALID:", handleAxiosError(error));

        await signOut({
          redirect: false,
        });

        const message = isNetworkError(error)
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