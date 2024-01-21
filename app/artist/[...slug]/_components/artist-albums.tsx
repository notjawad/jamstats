"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import axios from "axios";

import { SpotifyAlbum } from "@/interfaces";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

const ArtistAlbums = ({ className, ...props }: ComponentProps<"div">) => {
  const { data: session, status } = useSession();
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const { slug } = useParams();

  const artistId = slug[0];

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchAlbums = async () => {
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums`,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
              params: {
                market: "from_token",
              },
            },
          );
          setAlbums(data.items);
        } catch (error) {
          console.error(error);
        }
      };

      if (session) {
        fetchAlbums();
      }
    }
  }, [session]);

  return (
    <div {...props} className={twMerge("", className)}>
      <h2 className="text-2xl font-bold">Top Albums</h2>
      <p className="flex items-center gap-x-1 text-sm text-muted-foreground">
        <span className="font-bold">{slug[1]}&apos;s</span>
        most popular albums
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
        {albums.map((album) => (
          <Link
            href={album.external_urls.spotify}
            key={album.id}
            className="duraiton-300 relative overflow-ellipsis rounded-md border border-black/10 p-2 transition-colors ease-in-out hover:bg-black/10 dark:border-white/10 dark:hover:bg-white/10"
          >
            <div className="flex  items-center gap-x-2">
              <Image
                src={album.images[0].url}
                alt="avatar"
                width={64}
                height={64}
                className="h-16 w-16 rounded-md opacity-0 transition-opacity duration-500 ease-in-out"
                loading="lazy"
                onLoad={(image) => {
                  image.currentTarget.classList.remove("opacity-0");
                }}
              />
              <div>
                <p className="line-clamp-1 text-sm font-semibold text-black text-muted-foreground dark:text-white">
                  {album.name}
                </p>
                <p className="line-clamp-1 text-xs font-semibold text-muted-foreground">
                  {album.artists[0].name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistAlbums;
