import React, { ComponentProps } from "react";
import LoginButton from "@/components/login-button";

const Hero = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div {...props} className="container">
      <>
        <div className="xs:overflow-hidden mx-auto mt-10 pb-8 sm:mt-12 md:mt-16 md:overflow-visible lg:mt-20">
          <h1 className="mx-auto flex flex-col items-center pb-4 text-3xl font-extrabold tracking-tight sm:pb-4 sm:text-4xl md:block">
            Your Spotify Library, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              visualized.
            </span>
          </h1>
          <p className="mx-auto pb-4 text-center text-base text-gray-500 dark:text-zinc-400 sm:pb-4 sm:text-lg md:text-start md:text-xl lg:mx-0">
            Get statistics and insights about your top artists, tracks, and
            genres.
          </p>
          <LoginButton className="w-full md:w-fit" />
        </div>
      </>
    </div>
  );
};

export default Hero;
