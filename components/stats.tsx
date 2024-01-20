"use client";

import { useSession } from "next-auth/react";
import React, { ComponentProps, useState, useEffect } from "react";

import axios from "axios";

import Image from "next/image";
import Link from "next/link";

import { Artist, Track } from "@/lib/spotify/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface StatsProps extends ComponentProps<"div"> {
  type: string;
  timeframe: string;
}

const Stats = ({ className, type, timeframe, ...props }: StatsProps) => {
  const { data: session, status } = useSession();

  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    if (
      session &&
      "access_token" in session &&
      (type === "artists" || type === "tracks")
    ) {
      const getTopData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/me/top/${type}?time_range=${timeframe}`,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
            },
          );
          if (type === "artists") {
            setTopArtists(data.items);
          } else if (type === "tracks") {
            setTopTracks(data.items);
          }
        } catch (error) {
          console.error(error);
        }
      };

      getTopData();
    }
  }, [session, type, timeframe]);

  return (
    <div {...props}>
      <div className="flex flex-row space-x-4 pb-2">
        {status === "loading"
          ? [...Array(4)].map((_, index) => (
              <div
                className="relative flex h-0 flex-1 items-center justify-center bg-gray-50"
                key={index}
              >
                <div className="absolute inset-0 z-10">
                  <div className="h-36 w-36 animate-pulse rounded-md border border-black/10 bg-accent dark:border-white/10" />
                </div>
              </div>
            ))
          : type === "artists" &&
            topArtists.length > 0 &&
            topArtists.slice(0, 4).map((artist) => (
              <div
                className="relative mt-2 flex h-0 flex-1 items-center justify-center bg-gray-50"
                key={artist.id}
              >
                <Link
                  href={`/artist/${artist.id}`}
                  className="absolute inset-0 z-10"
                >
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className="h-36 w-36 rounded-md border-white/20 object-cover opacity-0 transition-opacity duration-500 dark:border"
                    loading="lazy"
                    onLoad={(image) => {
                      image.currentTarget.classList.remove("opacity-0");
                      setImagesLoading(false);
                    }}
                  />
                </Link>
              </div>
            ))}

        {type === "tracks" &&
          topTracks.length > 0 &&
          topTracks.slice(0, 4).map((track) => (
            <div
              className="relative mt-2 flex h-0 flex-1 items-center justify-center bg-gray-50"
              key={track.id}
            >
              <Link
                href={`/track/${track.id}`}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={200}
                  height={200}
                  className="h-36 w-36 rounded-md border-white/20 object-cover opacity-0 transition-opacity duration-500 ease-out dark:border"
                  loading="lazy"
                  onLoad={(image) => {
                    image.currentTarget.classList.remove("opacity-0");
                  }}
                />
              </Link>
            </div>
          ))}
      </div>
      <div
        className={cn(
          "flex min-w-full items-center py-2 align-middle md:inline-block",
          topArtists.length > 0 && "mt-36",
        )}
      >
        <ScrollArea
          className={cn(
            "h-[400px] w-full rounded-md border",
            topTracks.length > 0 && "mt-36",
            status === "loading" && "mt-36",
            imagesLoading && "mt-[145px]",
          )}
        >
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider dark:border-white/10">
                  #
                </th>
                <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider dark:border-white/10">
                  {type === "artists" ? "Artist" : "Track"}
                </th>
                <th className="border-b border-gray-300 px-6 py-3  text-center text-sm font-medium uppercase tracking-wider dark:border-white/10">
                  Popularity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/10">
              {type === "artists" &&
                topArtists.map((artist, index) => (
                  <tr key={artist.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {index + 1}
                    </td>
                    <td className="flex items-center gap-x-2 whitespace-nowrap px-6 py-4 text-sm">
                      <Image
                        src={artist.images[0].url}
                        alt={artist.name}
                        width={50}
                        height={50}
                        className="h-8 w-8 rounded-md object-cover"
                      />
                      <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      {artist.popularity}
                    </td>
                  </tr>
                ))}

              {type === "tracks" &&
                topTracks.map((track, index) => (
                  <tr key={track.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {index + 1}
                    </td>
                    <td className="flex items-center gap-x-2 whitespace-nowrap px-6 py-4 text-sm">
                      <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        width={50}
                        height={50}
                        className="h-8 w-8 rounded-md object-cover"
                      />
                      <Link href={`/track/${track.id}`}>{track.name}</Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                      {track.popularity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Stats;
