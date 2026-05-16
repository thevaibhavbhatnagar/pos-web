import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import axiosInstance, { isNetworkError } from "@/utils/axiosInstance";
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
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        try {
          const response = await axiosInstance.post(
            apiEndpoints.authentication.login,
            { email, password },
          );

          const data: {
            accessToken?: string;
            data?: AppUser;
          } = response.data;

          const accessToken = data?.accessToken;
          const user = data?.data;

          if (!accessToken || !user) return null;

          return {
            id: user.id,
            name: user.name ?? null,
            email: user.email ?? null,
            role: user.role,
            branchId: user.branchId ?? null,
            branchName: user.branchName ?? null,
            accessToken,
          };
        } catch (error: any) {
          console.error("--- AUTHENTICATION ERROR START ---");
          console.error("Path:", apiEndpoints.authentication.login);
          console.error("Status:", error?.response?.status);
          console.error("Message:", error?.message);
          if (error?.response?.data) {
            console.error(
              "Response Data:",
              JSON.stringify(error.response.data),
            );
          }
          console.error("--- AUTHENTICATION ERROR END ---");

          // Backend unreachable
          if (isNetworkError(error)) {
            throw new Error("SERVER_UNREACHABLE");
          }

          // Invalid credentials
          if (error?.response?.status === 401) {
            throw new Error("INVALID_CREDENTIALS");
          }

          // Forbidden
          if (error?.response?.status === 403) {
            throw new Error("ACCESS_DENIED");
          }

          // Conflict
          if (error?.response?.status === 409) {
            throw new Error("ACCOUNT_NOT_VERIFIED");
          }

          // Internal server error
          if (error?.response?.status >= 500) {
            throw new Error("SERVER_ERROR");
          }

          throw new Error("SOMETHING_WENT_WRONG");
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
      session.user = token.user!;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
