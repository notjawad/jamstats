"use client";

import React, { ComponentProps, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import { BsSpotify } from "react-icons/bs";

import { toTitleCase } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Icons } from "@/components/spinner";
import { twMerge } from "tailwind-merge";

interface Artist {
  id: string;
  images?:
    | {
        height: number;
        url: string;
        width: number;
      }[]
    | null;
  name: string;
}

const Artists = ({ className, ...props }: ComponentProps<"div">) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const tag = (params.genreId as string).replace(/%20/g, "-");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchArtists = async () => {
        try {
          const { data } = await axios.get(
            "https://jamstats-api.vercel.app/api/users",
            {
              params: {
                genreId: tag,
              },
            },
          );

          setArtists(data.topArtists);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchArtists();
    }
  }, [tag, session]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (artists.length === 0) {
    return null;
  }

  return (
    <div {...props} className={twMerge("", className)}>
      <h2 className="mb-4 text-xl font-bold">
        Top artists in {toTitleCase(decodeURIComponent(tag.toString()))}
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {artists.map((artist) => (
          <div
            onClick={() => {
              window.location.href = `/artist/${artist.id}/${artist.name}`;
            }}
            key={artist.id}
            className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-black/10 bg-accent p-4 transition-all duration-150 ease-in-out hover:border-black/20 dark:border-white/10 hover:dark:border-white/20"
          >
            <Image
              src={
                artist.images && artist.images.length > 0
                  ? artist.images[0].url
                  : "/images/artist-placeholder.png"
              }
              alt={artist.name}
              width={200}
              height={200}
              className="h-16 w-16 rounded-full opacity-0 transition-opacity duration-500 ease-in-out"
              loading="lazy"
              onLoad={(image) => {
                image.currentTarget.classList.remove("opacity-0");
              }}
            />
            <h3 className="mt-2 line-clamp-1 text-center text-lg font-bold">
              {artist.name}
            </h3>
            <Link
              className="mt-2 hidden items-center gap-x-2 rounded-md border border-black/10 bg-white px-2 py-1 text-sm font-medium transition-colors duration-150 ease-in-out hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-stone-800 dark:hover:border-white/20 dark:hover:bg-stone-700 md:flex"
              href={`https://open.spotify.com/artist/${artist.id}`}
            >
              <BsSpotify className="text-emerald-500" />
              Listen on Spotify
            </Link>
            <Link
              className="mt-2 flex w-full items-center justify-center gap-x-2 rounded-md border border-black/10 bg-white px-2 py-1 text-sm font-medium transition-colors duration-150 ease-in-out hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-stone-800 dark:hover:border-white/20 dark:hover:bg-stone-700 md:hidden md:w-fit"
              href={`https://open.spotify.com/artist/${artist.id}`}
            >
              <BsSpotify className="text-green-500" />
              Listen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
