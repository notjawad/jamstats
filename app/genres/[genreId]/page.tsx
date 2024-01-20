"use client";

import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import Artists from "./_components/artists";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";

import { Tag } from "@/lib/spotify/types";
import { getSimilarTags, removeHtmlTags, toTitleCase } from "@/lib/utils";
import { genres } from "@/lib/spotify/genre-array";
import Link from "next/link";

const GenrePage = () => {
  const params = useParams<{ genreId: string }>();
  const { genreId } = params;

  const [genreInfo, setGenreInfo] = useState<Tag>();
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchGenreInfo = async () => {
      try {
        const { data } = await axios.get(`/api/tag?tag=${genreId}`);
        setGenreInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenreInfo();
  }, [genreId]);

  if (status === "unauthenticated") {
    redirect("/");
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const similarTags = getSimilarTags(genres, genreInfo?.tag.name);

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
            <div>
              <h1 className="mb-2 inline-block text-2xl font-extrabold tracking-tight">
                {toTitleCase(genreInfo?.tag.name)}
              </h1>
              <p className="mb-4 line-clamp-6 w-full text-sm text-muted-foreground xl:mr-64">
                {removeHtmlTags(genreInfo?.tag.wiki.content) ||
                  "No description available"}
              </p>
              {similarTags.length > 0 && (
                <p className="mb-2 text-sm font-semibold">
                  Similar to {toTitleCase(genreInfo?.tag.name)}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-4">
                {similarTags.slice(0, 8).map((tag) => (
                  <Link key={tag} className="" href={`/genres/${tag}`}>
                    <Badge variant="outline" key={tag} className="mb-2">
                      {toTitleCase(tag)}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            <Artists tag={genreInfo?.tag.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
