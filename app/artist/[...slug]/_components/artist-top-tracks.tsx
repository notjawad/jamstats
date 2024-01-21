"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import axios from "axios";

import { SpotifyTrack } from "@/interfaces";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

const ArtistTopTracks = ({ className, ...props }: ComponentProps<"div">) => {
  const { data: session, status } = useSession();
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const { slug } = useParams();

  const artistId = slug[0];

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchTopTracks = async () => {
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
              params: {
                market: "from_token",
              },
            },
          );
          setTopTracks(data.tracks);
        } catch (error) {
          console.error(error);
        }
      };

      if (session) {
        fetchTopTracks();
      }
    }
  }, [session]);

  return (
    <div {...props} className={twMerge("", className)}>
      <h2 className="text-2xl font-bold text-black dark:text-white">
        Top Tracks
      </h2>
      <p className="flex items-center gap-x-1 text-sm text-muted-foreground">
        The most popular tracks by{" "}
        <span className="font-bold">{decodeURIComponent(slug[1])}</span>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3">
        {topTracks.map((track) => (
          <Link
            href={track.external_urls.spotify}
            key={track.id}
            className="duraiton-300 relative overflow-ellipsis rounded-md border border-black/10 p-2 transition-colors ease-in-out hover:bg-black/10 dark:border-white/10 dark:hover:bg-white/10"
          >
            <div className="flex  items-center gap-x-2">
              <Image
                src={track.album.images[0].url}
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
                  {track.name}
                </p>
                <p className="line-clamp-1 text-xs font-semibold text-muted-foreground">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistTopTracks;
