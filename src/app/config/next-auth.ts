import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      async authorize(credentials) {
          //...
        },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      //...
    },
    async session({ session, token }) {
        //...
      },
    async jwt({ token, user }) {
        //... 
      },
  },
  // use env variable in production
  secret: "looselipssinkships",
});