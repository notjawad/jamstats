"use client";

import React, { ComponentProps } from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import NowPlaying from "@/components/now-playing";

interface UserSectionProps extends ComponentProps<"div"> {
  label: string;
}

const UserSection = ({ className, label, ...props }: UserSectionProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        {...props}
        className="flex items-center justify-between rounded-md border border-black/10 bg-accent p-2 dark:border-white/10"
      >
        <div className="flex items-center">
          <div className="h-16 w-16 animate-pulse rounded-md bg-black/10" />
          <div className="ml-4">
            <div className="h-4 w-32 animate-pulse rounded-md bg-black/10" />
            <div className="mt-1 h-3 w-24 animate-pulse rounded-md bg-black/10" />
          </div>
        </div>
        <div className="h-4 w-24 animate-pulse rounded-md bg-black/10" />
      </div>
    );
  }

  return (
    <div
      {...props}
      className="flex items-center justify-between rounded-md border border-black/10 bg-accent p-2 dark:border-white/10"
    >
      <div className="flex items-center">
        <Image
          src={session?.user?.image || ""}
          alt="User Image"
          width={64}
          height={64}
          className="rounded-md"
        />
        <div className="ml-4 truncate">
          <h2 className="truncate text-lg font-medium leading-6">
            {session?.user?.name}
          </h2>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
      <NowPlaying className="hidden sm:flex" />
    </div>
  );
};

export default UserSection;
