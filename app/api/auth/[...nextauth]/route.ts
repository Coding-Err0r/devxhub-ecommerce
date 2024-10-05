import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function POST(request: Request) {
  const options = {
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

          const { name, email, password, avatar } = credentials;

          try {
            const res = await fetch("/api/auth/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password, avatar }),
            });

            const data = await res.json();

            if (res.ok && data.user) {
              return data.user;
            } else {
              console.error("Signup error:", data.error);
              throw new Error(data.error || "Signup failed");
            }
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
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
  };

  return NextAuth(options);
}
