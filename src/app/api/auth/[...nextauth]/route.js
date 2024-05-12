import { Users } from "@/models";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (profile) {
        await Users.create({
          name: profile.name,
          email: profile.email,
          password: "",
          description: "",
          applications: [],
          experience: [],
        });
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
