import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { login } from './api/usersAPI';
import z from "zod"
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await login(email, password)
            if(!user) {
                return null
            }
            return user
            
          }
          return null
        
    }
    }),
  ],
});