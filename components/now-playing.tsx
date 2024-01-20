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
        "flex items-center justify-center rounded bg-gradient-to-r from-green-600 to-green-500 p-2",
        className ?? "",
      )}
      {...props}
    >
      {track && (
        <>
          <Image
            src={track.album.images[0].url}
            alt="Album Art"
            width={40}
            height={40}
            className="mr-3 h-10 w-10 rounded shadow-md"
            loading="lazy"
          />
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <Link
                className="font-semibold text-white hover:underline"
                href={track.external_urls.spotify}
              >
                {track.name.length > 25
                  ? `${track.name.substring(0, 25)}...`
                  : track.name}
              </Link>
              <div className="bars ml-4 mr-4 inline-flex h-3 items-end justify-between gap-[0.1875rem]">
                <div className="bar bar1 w-1 bg-gray-100"></div>
                <div className="bar bar2 w-1 bg-gray-100"></div>
                <div className="bar bar3 w-1 bg-gray-100"></div>
              </div>
            </div>
            <Link
              className="text-xs font-semibold text-black/70 hover:underline"
              href={track.album.external_urls.spotify}
            >
              {track.artists.map((artist) => artist.name).join(", ")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NowPlaying;
