import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userSchema";
import bcrypt from "bcrypt";
import { SessionStrategy } from "next-auth";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const { email, password } = credentials;
          try {
            await connectMongoDB();
            const user = await User.findOne({ email });

            if (!user) {
              return null;
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
              return null;
            }

            // console.log("user from db", user);
            return user;
          } catch (error) {
            console.log("auth page", error);
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.username = user.username;
        token.id = user._id;
      }
      // console.log("token, user in jwt", token, user);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
      }
      // console.log("session", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
