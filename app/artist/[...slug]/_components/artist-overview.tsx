"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import axios from "axios";

import { twMerge } from "tailwind-merge";

import { Artist } from "@/interfaces";
import { Icons } from "@/components/spinner";
import { toast, ExternalToast } from "sonner";
import ArtistCard from "./artist-card";
import { ArtistDescription } from "./artist-desc";
import { MdError } from "react-icons/md";

interface ArtistOverviewProps extends ComponentProps<"div"> {
  artistName: string;
}

const ArtistOverview = ({
  artistName,
  className,
  ...props
}: ArtistOverviewProps) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorToastId, setErrorToastId] = useState<string | number | null>(
    null,
  );

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const { data } = await axios.get("/api/genius/artist", {
          params: { artist: decodeURIComponent(artistName) },
        });

        if (data.error) {
          setError(data.error);
          setIsLoading(false);
          return;
        }
        setArtist(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchArtist();
  }, [artistName]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    if (!errorToastId) {
      setErrorToastId(
        toast.error("Whoops! I couldn't find that artist.", {
          description: error,
        }),
      );
    }

    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <MdError className="h-32 w-32 text-red-500 dark:text-rose-500" />
          <h1 className="text-center text-2xl font-bold">Artist not found</h1>
          <p className="text-center text-muted-foreground">
            Sorry about that! I couldn't find the artist you were looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={twMerge("", className)} {...props}>
      <ArtistCard artist={artist} />
      {artist?.description?.dom && (
        <ArtistDescription
          avatar={artist.image_url}
          artistName={artist.name}
          description={artist.description.dom}
        />
      )}
    </div>
  );
};

export default ArtistOverview;
