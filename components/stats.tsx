import { useSession } from "next-auth/react";
import React, { ComponentProps, useState, useEffect } from "react";

import axios from "axios";

import Image from "next/image";
import Link from "next/link";

import { Artist, Track } from "@/lib/spotify/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatsProps extends ComponentProps<"div"> {
  type: string;
  timeframe: string;
}

const Stats = ({ className, type, timeframe, ...props }: StatsProps) => {
  const { data: session } = useSession();

  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

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
        {type === "artists" &&
          topArtists.slice(0, 4).map((artist) => (
            <div
              className="relative flex h-0 flex-1 items-center justify-center bg-gray-50"
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
                  className="h-36 w-36 rounded-md border-white/20 object-cover dark:border"
                />
              </Link>
            </div>
          ))}

        {type === "tracks" &&
          topTracks.slice(0, 4).map((track) => (
            <div
              className="relative flex h-0 flex-1 items-center justify-center bg-gray-50"
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
                  className="h-36 w-36 rounded-md border-white/20 object-cover dark:border"
                />
              </Link>
            </div>
          ))}
      </div>
      <div className="mt-36 inline-block min-w-full py-2 align-middle">
        <ScrollArea className="h-[400px] rounded-md border p-4">
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
