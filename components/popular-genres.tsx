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
    },
    {
      name: "hip hop",
      color: "bg-yellow-300",
      image: "/images/genres/hip-hop.png",
    },
    {
      name: "rock",
      color: "bg-gray-600",
      image: "/images/genres/rock.png",
    },
    {
      name: "indie",
      color: "bg-violet-300",
      image: "/images/genres/indie.png",
    },
    {
      name: "edm",
      color: "bg-green-300",
      image: "/images/genres/edm.png",
    },
    {
      name: "r&b",
      color: "bg-blue-300",
      image: "/images/genres/rnb.png",
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
            href={`/genres/${genre.name}`}
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
