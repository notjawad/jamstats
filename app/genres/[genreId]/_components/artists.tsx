"use client";

import React, { ComponentProps, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import { BsSpotify } from "react-icons/bs";

import { Artist, TagArtist } from "@/lib/spotify/types";
import { toTitleCase } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Icons } from "@/components/spinner";

interface A extends TagArtist {
  spotify: Artist;
}

const Artists = ({ className, ...props }: ComponentProps<"div">) => {
  const [artists, setArtists] = useState<A[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const tag = params.genreId;

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchArtists = async () => {
        const { data } = await axios.get(`/api/tag/artists?tag=${tag}`);
        const artists = data.topartists.artist;

        const spotifyArtists = await Promise.all(
          artists.map(async (artist: Artist) => {
            const response = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist.name)}&type=artist`,
              {
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
                },
              },
            );
            const spotifyData = await response.json();
            return {
              ...artist,
              spotify: spotifyData.artists.items[0],
            };
          }),
        );

        setArtists(spotifyArtists);
        setIsLoading(false);
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
    <div {...props}>
      <h2 className="mb-4 text-xl font-bold">
        Top artists in {toTitleCase(decodeURIComponent(tag.toString()))}
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {artists.map((artist) => (
          <div
            key={artist.spotify.id}
            className="flex flex-col items-center justify-center rounded-md border border-black/10 bg-accent p-4 dark:border-white/10"
          >
            <Image
              src={
                artist.spotify.images && artist.spotify.images.length > 0
                  ? artist.spotify.images[0].url
                  : "/images/artist-placeholder.png"
              }
              alt={artist.name}
              width={200}
              height={200}
              className="h-28 w-28 rounded-full opacity-0 transition-opacity duration-500 ease-in-out"
              loading="lazy"
              onLoad={(image) => {
                image.currentTarget.classList.remove("opacity-0");
              }}
            />
            <h3 className="mt-2 line-clamp-1 text-center text-lg font-bold">
              {artist.name}
            </h3>
            <Link
              className="mt-2 hidden items-center gap-x-2 rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-stone-800 dark:hover:border-white/20 dark:hover:bg-stone-700 md:flex"
              href={artist.spotify.external_urls.spotify}
            >
              <BsSpotify className="text-green-500" />
              Listen on Spotify
            </Link>
            <Link
              className="mt-2 flex items-center gap-x-2 rounded-md border border-black/10 bg-white px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-stone-800 dark:hover:border-white/20 dark:hover:bg-stone-700 md:hidden"
              href={artist.spotify.external_urls.spotify}
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
