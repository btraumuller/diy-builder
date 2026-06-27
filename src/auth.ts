import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Replace with real DB lookup + password verification
        // Example: const user = await getUserByEmail(credentials.email)
        // if (!user || !verifyPassword(credentials.password, user.passwordHash)) return null
        // return user

        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Demo User", email: "user@example.com" };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
});
