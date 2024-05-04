import { Users } from "@/models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
          const passwordMatch = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (passwordMatch) {
            return existingUser;
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
