"use client";

import React, { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

import { Artist } from "@/interfaces";
import { Verified } from "lucide-react";
import { BsInstagram, BsSpotify, BsTwitterX } from "react-icons/bs";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ArtistCardProps extends ComponentProps<"div"> {
  artist: Artist | null;
}

const ArtistCard = ({ artist, className, ...props }: ArtistCardProps) => {
  const { slug } = useParams();
  const artistId = slug[0];

  return (
    <div {...props} className={twMerge("rounded-md border p-4", className)}>
      <div className="flex items-center gap-x-4">
        <Image
          src={artist?.image_url || "/images/artist-placeholder.png"}
          alt={artist?.name || "Artist"}
          width={200}
          height={200}
          className="h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 ease-in-out"
          loading="lazy"
          onLoad={(image) => {
            image.currentTarget.classList.remove("opacity-0");
          }}
        />
        <div className="flex w-full flex-col">
          <div className="mt-4 flex items-center justify-between text-xl font-bold">
            <h2 className="flex items-center">
              {artist?.name}
              {artist?.is_verified && (
                <span className="ml-2 text-blue-500">
                  <Verified className="h-4 w-4" />
                </span>
              )}
            </h2>
            {/* Move the Spotify button outside the previous container */}
            <Link href={`https://open.spotify.com/artist/${artistId}`}>
              <Button
                className="flex items-center gap-x-2 text-xs"
                variant="outline"
                size="sm"
              >
                <BsSpotify className="h-3 w-3" />
                Open in Spotify
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-x-2">
            {artist?.twitter_name && (
              <p className="flex items-center gap-x-1 text-sm text-muted-foreground">
                <BsTwitterX className="h-3 w-3" />
                <Link
                  href={`https://twitter.com/${artist?.twitter_name}`}
                  className="text-xs hover:underline"
                >
                  {artist?.twitter_name.toLowerCase()}
                </Link>
              </p>
            )}
            {artist?.instagram_name && (
              <p className="flex items-center gap-x-1 text-sm text-muted-foreground">
                <BsInstagram className="h-3 w-3" />
                <Link
                  href={`https://instagram.com/${artist?.instagram_name}`}
                  className="text-xs hover:underline"
                >
                  {artist?.instagram_name.toLowerCase()}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
