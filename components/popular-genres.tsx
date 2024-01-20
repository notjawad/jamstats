import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const PopularGenres = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const genres = [
    {
      name: "pop",
      color: "bg-pink-300",
      image: "/images/genres/pop.png",
      href: "/genres/pop",
    },
    {
      name: "hip hop",
      color: "bg-yellow-300",
      image: "/images/genres/hip-hop.png",
      href: "/genres/hip-hop",
    },
    {
      name: "rock",
      color: "bg-gray-600",
      image: "/images/genres/rock.png",
      href: "/genres/rock",
    },
    {
      name: "indie",
      color: "bg-violet-300",
      image: "/images/genres/indie.png",
      href: "/genres/indie",
    },
    {
      name: "edm",
      color: "bg-green-300",
      image: "/images/genres/edm.png",
      href: "/genres/edm",
    },
    {
      name: "r&b",
      color: "bg-blue-300",
      image: "/images/genres/rnb.png",
      href: "/genres/rnb",
    },
  ];

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };

  return (
    <div {...props}>
      <h2 className="text-xl font-semibold">Popular Genres</h2>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        {genres.map((genre) => (
          <Link
            href={genre.href}
            key={genre.name}
            className={twMerge(
              "group flex cursor-pointer items-center justify-between overflow-hidden rounded-lg border border-black/10 dark:border-white/10",
              genre.color,
              className,
            )}
          >
            <Image
              src={genre.image}
              alt={genre.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-lg transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:drop-shadow-xl"
              loading="lazy"
            />
            <span className="p-2 text-4xl font-semibold text-white">
              {toTitleCase(genre.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
