import {NextAuthOptions} from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid profile email offline_access User.Read User.ReadBasic.All',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      // Persist the access_token and id_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({session, token}) {
      // Send id_token to the client (backend validates this)
      // id_token has the correct audience and user claims
      session.accessToken = (token.idToken || token.accessToken) as string;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
