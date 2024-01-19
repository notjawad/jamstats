"use client";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import Navbar from "@/components/navbar";

interface Props {
  session: Session | null;
  children: React.ReactNode;
  token: string | null;
}

const RootLayout: React.FC<Props> = ({ children, session }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
