import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import axiosInstance from "@/utils/axiosInstance";
import apiEndpoints from "@/utils/endpoints";


declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "OTP Login",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const otp = credentials?.otp;
        if (!email || !otp) return null;

        try {
          const response = await axiosInstance.post(
            apiEndpoints.authentication.loginVerify,
            { email, otp },
          );
          const data: { accessToken?: string } = response.data?.data;
          const accessToken = data?.accessToken ?? "";

          if (!accessToken) return null;
          console.log(response.data?.data?.permissions);
          return { accessToken } as any;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }: any) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },

  pages: { signIn: "/auth/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
