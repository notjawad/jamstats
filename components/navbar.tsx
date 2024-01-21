"use client";

import { User } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { BsSoundwave } from "react-icons/bs";

import React, { ComponentProps, useState, useEffect } from "react";

import axios from "axios";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import ThemeToggle from "./theme-toggle";

const Navbar = ({ className, ...props }: ComponentProps<"nav">) => {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session && "access_token" in session) {
      const getUser = async () => {
        try {
          const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          });
          setUser(data);
          data;
        } catch (error) {
          console.error(error);
        }
      };

      if (session) {
        getUser();
      }
    }
  }, [session]);

  return (
    <nav {...props} className="relative">
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 md:px-12">
        <Link href="/" className="flex min-w-0 flex-shrink items-center">
          <BsSoundwave className="h-10 w-10" />
          <span className="ml-2 text-2xl font-bold">Jamstats</span>
        </Link>

        {session && (
          <div className="flex items-center">
            <ThemeToggle />

            <Button variant="ghost" onClick={() => signOut()} className="">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-slate-900/5 dark:bg-white/10"></div>
    </nav>
  );
};

export default Navbar;
