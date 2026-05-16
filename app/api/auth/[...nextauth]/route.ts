// app/api/auth/[...nextauth]/route.ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AxiosError } from "axios";

import axiosInstance, {
  isNetworkError,
  isServerUnavailableStatus,
} from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";

type AppUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
  branchId?: string | null;
  branchName?: string | null;
};

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  branchId?: string | null;
  branchName?: string | null;
};

type LoginResponse = {
  success?: boolean;
  statusCode?: number;
  accessToken?: unknown;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidLoginResponse(data: LoginResponse): data is LoginResponse & {
  accessToken: string;
  data: AppUser;
} {
  return (
    data.success !== false &&
    (data.statusCode === undefined || data.statusCode < 400) &&
    typeof data.accessToken === "string" &&
    data.accessToken.length > 0 &&
    isRecord(data.data) &&
    typeof data.data.id === "string" &&
    typeof data.data.role === "string"
  );
}

declare module "next-auth" {
  interface User extends AppUser {
    accessToken: string;
  }

  interface Session {
    accessToken?: string;
    user: SessionUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: SessionUser;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  providers: [
    Credentials({
      name: "Admin Login",

      credentials: {
        email: {
          label: "Email",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE STARTED");

        try {
          const response = await axiosInstance.post(
            apiEndpoints.authentication.login,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

          console.log("LOGIN RESPONSE:", response.data);

          const data = response.data as LoginResponse;

          if (!isValidLoginResponse(data)) {
            console.log("INVALID LOGIN RESPONSE");
            throw new Error("SERVER_ERROR");
          }

          console.log("LOGIN SUCCESS");

          return {
            ...data.data,
            accessToken: data.accessToken,
          };
        } catch (error: unknown) {
          console.log("AUTHORIZE ERROR:", error);

          const status =
            error instanceof AxiosError ? error.response?.status : undefined;

          if (
            isNetworkError(error) ||
            isServerUnavailableStatus(status)
          ) {
            console.log("NETWORK ERROR DETECTED");
            throw new Error("SERVER_UNREACHABLE");
          }

          if (status === 401) {
            console.log("INVALID CREDENTIALS");
            return null;
          }

          throw new Error("SERVER_ERROR");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;

        token.user = {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          role: user.role,
          branchId: user.branchId ?? null,
          branchName: user.branchName ?? null,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;

      session.user = token.user as SessionUser;

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return `${baseUrl}/dashboard`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
