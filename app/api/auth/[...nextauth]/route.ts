import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { scopes } from "@/lib/spotify/scopes";
import axios from "axios";
import { JWT } from "next-auth/jwt";

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (token.accessTokenExpires ?? 0 > Date.now()) {
      return token;
    }

    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64",
    );
    const { data } = await axios.post(
      SPOTIFY_REFRESH_TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID as string,
      clientSecret: CLIENT_SECRET as string,
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
        token = Object.assign(token, {
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires: (account.expires_at ?? 0) * 1000,
        });
      }

      token = await refreshAccessToken(token);

      return token;
    },

    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          id: token.sub,
          access_token: token.access_token,
        });
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
