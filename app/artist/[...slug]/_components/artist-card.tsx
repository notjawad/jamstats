import { Artist } from "@/interfaces";
import { Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps } from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface ArtistCardProps extends ComponentProps<"div"> {
  artist: Artist | null;
}

const ArtistCard = ({ artist, className, ...props }: ArtistCardProps) => {
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
        <div>
          <h2 className="mt-4 flex items-center text-xl font-bold">
            {artist?.name}
            {artist?.is_verified && (
              <span className="ml-2 text-blue-500">
                <Verified className="h-4 w-4" />
              </span>
            )}
          </h2>
          <div className="flex items-center gap-x-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
