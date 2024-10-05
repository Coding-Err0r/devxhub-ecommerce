import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "@/services/apolloClient";
import { ADD_USER } from "@/graphql/query";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        avatar: { label: "Avatar", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const result = await client.query({
            query: ADD_USER,
            variables: {
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
              avatar: credentials.avatar,
            },
          });
        } catch (error) {
          console.error("Authorization error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
