"use client";

import React, { ComponentProps, useEffect } from "react";
import { Track } from "@/lib/spotify/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const NowPlaying = ({ className, ...props }: ComponentProps<"div">) => {
  const [track, setTrack] = React.useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchNowPlaying = async () => {
        try {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            },
          );

          if (response.status === 204 || response.status > 400) {
            setIsPlaying(false);
            return;
          }

          setIsPlaying(true);
          setTrack(response.data.item);
        } catch (error) {
          console.error(error);
        }
      };

      fetchNowPlaying();

      const intervalId = setInterval(fetchNowPlaying, 3000);
      return () => clearInterval(intervalId);
    }
  }, [session]);

  if (!isPlaying) {
    return;
  }

  return (
    <div
      className={twMerge(
        "relative flex items-center justify-center overflow-hidden rounded border border-black/10 p-2 dark:border-white/10",
        className ?? "",
      )}
      {...props}
    >
      {track && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center blur-[20px]"
            style={{ backgroundImage: `url(${track.album.images[0].url})` }}
          />

          <div
            className={twMerge(
              "relative flex items-center justify-center gap-x-2 bg-transparent",
            )}
          >
            <Image
              src={track.album.images[0].url}
              alt="Album Art"
              width={40}
              height={40}
              className="h-10 w-10 rounded shadow-md"
              loading="lazy"
            />
            <div className="flex flex-col items-start text-white">
              <div className="flex items-center">
                <Link
                  className="font-semibold hover:underline"
                  href={track.external_urls.spotify}
                >
                  {track.name.length > 25
                    ? `${track.name.substring(0, 25)}...`
                    : track.name}
                </Link>
                <div className="bars ml-4 mr-4 inline-flex h-3 items-end justify-between gap-[0.1875rem]">
                  <div className="bar bar1 w-[2px] bg-gray-200"></div>
                  <div className="bar bar2 w-[2px] bg-gray-200"></div>
                  <div className="bar bar3 w-[2px] bg-gray-200"></div>
                </div>
              </div>
              <Link
                className="text-xs font-semibold hover:underline"
                href={track.album.external_urls.spotify}
              >
                {track.artists.map((artist) => artist.name).join(", ")}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NowPlaying;
