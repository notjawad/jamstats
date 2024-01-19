import React, { ComponentProps } from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import NowPlaying from "@/components/now-playing";

interface UserSectionProps extends ComponentProps<"div"> {
  label: string;
}

const UserSection = ({ className, label, ...props }: UserSectionProps) => {
  const { data: session, status } = useSession();

  return (
    <div {...props} className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={session?.user?.image || ""}
          alt="User Image"
          width={64}
          height={64}
          className="rounded-full shadow-md"
        />
        <div className="ml-4 truncate">
          <h2 className="truncate text-lg font-medium leading-6">
            {session?.user?.name}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
        </div>
      </div>
      <NowPlaying className="hidden sm:flex" />
    </div>
  );
};

export default UserSection;
