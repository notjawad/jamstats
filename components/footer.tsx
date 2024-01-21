import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { BsGithub, BsSoundwave, BsTwitterX } from "react-icons/bs";

import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";

const Footer = ({ className, ...props }: ComponentProps<"footer">) => {
  return (
    <footer
      {...props}
      className={twMerge(
        "mx-auto flex  items-center justify-center gap-x-2 border-t border-black/10 px-4 py-14 dark:border-white/10 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-y-2 text-center">
        <div className="flex items-center justify-center gap-x-2">
          <Link href="https://github.com/notjawad/spotify-stats">
            <Button size="icon" variant="ghost">
              <BsGithub className="text-2xl text-gray-500 dark:text-gray-400" />
            </Button>
          </Link>
          <Link href="#">
            <Button size="icon" variant="ghost">
              <BsTwitterX className="text-2xl text-gray-500 dark:text-gray-400" />
            </Button>
          </Link>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          All copyrighted content (i.e. album artwork) on Jamstats are owned by
          their respective owners. Data is provided by Spotify. Jamstats is in
          no way affiliated with Spotify.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
