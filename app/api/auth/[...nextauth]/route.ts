import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { scopes } from "@/lib/spotify/scopes";

const isTokenExpired = (token: { expires: number }) => {
  const currentTime = Math.floor(Date.now() / 1000);
  return token.expires < currentTime;
};

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: scopes,
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires: account.expires_at,
        });
      }

      if (isTokenExpired(token as { expires: number })) {
        const url = new URL("https://accounts.spotify.com/api/token");
        const body = new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refresh_token as string,
        });

        const response = await fetch(url.toString(), {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });

        const refreshedToken = await response.json();

        token = Object.assign({}, token, {
          access_token: refreshedToken.access_token,
          refresh_token: refreshedToken.refresh_token,
          expires: refreshedToken.expires_in,
        });
        return token;
      } else {
        return token;
      }
    },

    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
        });
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
