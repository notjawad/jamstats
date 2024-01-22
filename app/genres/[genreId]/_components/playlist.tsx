"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { twMerge } from "tailwind-merge";

import axios from "axios";

interface PlaylistProps extends ComponentProps<"div"> {
  genre: string;
}

const Playlist = ({ genre, className, ...props }: PlaylistProps) => {
  const { data: session } = useSession();

  const [playlist, setPlaylist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchPlaylist = async () => {
        try {
          const response = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              params: {
                q: `The Sound of ${decodeURIComponent(genre)}`,
                type: "playlist",
              },
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            },
          );

          const playlists = response.data.playlists.items;
          const filteredPlaylists = playlists.filter(
            (playlist: { owner: { id: string } }) =>
              playlist.owner.id.includes("thesoundsofspotify"),
          );

          setPlaylist(filteredPlaylists);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPlaylist();
    }
  }, [session]);

  if (!isLoading) {
    return (
      <div className={twMerge(className)} {...props}>
        {playlist.length > 0 && (
          <>
            <h1 className="text-2xl font-bold">Playlist</h1>
            <p className="mb-4 flex items-center gap-x-1 text-sm font-medium text-muted-foreground">
              Here is a playlist to get you started with{" "}
              <span className="text-emerald-500">
                {decodeURIComponent(genre)}
              </span>{" "}
              😀
            </p>
            <h2 className="mb-4 text-xl font-bold">
              <div className="relative overflow-hidden rounded-xl border border-black/10 bg-accent p-2 dark:border-white/10">
                <iframe
                  className="rounded-xl"
                  src={`https://open.spotify.com/embed/playlist/${playlist[0]?.id}`}
                  width="100%"
                  height="380"
                  allow="encrypted-media"
                  loading="lazy"
                ></iframe>
              </div>
            </h2>
          </>
        )}
      </div>
    );
  }
};

export default Playlist;
