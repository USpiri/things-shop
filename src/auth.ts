import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "auth/login",
    newUser: "auth/register",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          // label: "email",
          // type: "text",
          // placeholder: "email@example.com",
        },
        password: {
          // label: "Password",
          // type: "password",
          // placeholder: "********",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) throw new Error("Invalid credentials.");
        const { email, password } = parsedCredentials.data;

        console.log("AUTH", { email, password });

        return null;
      },
    }),
  ],
});
