"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { genres } from "@/lib/spotify/genre-array";
import { Tag } from "@/lib/spotify/types";
import { getSimilarTags, removeHtmlTags, toTitleCase } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const GenreInfo = () => {
  const params = useParams<{ genreId: string }>();
  const { genreId } = params;

  const [genreInfo, setGenreInfo] = useState<Tag>();
  const [isLoading, setIsLoading] = useState(true);

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

  const similarTags = getSimilarTags(genres, genreInfo?.tag.name);

  return (
    <div>
      <h1 className="mb-2 inline-block text-2xl font-extrabold tracking-tight">
        {toTitleCase(genreInfo?.tag.name)}
      </h1>
      <p className="mb-4 line-clamp-6 w-full text-sm text-muted-foreground xl:mr-64">
        {removeHtmlTags(genreInfo?.tag.wiki.content) || ""}
      </p>
      {similarTags.length > 0 && (
        <p className="mb-2 text-sm font-semibold">
          Similar to {toTitleCase(genreInfo?.tag.name)}
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-x-2">
        {similarTags.slice(0, 8).map((tag) => (
          <Link key={tag} className="" href={`/genres/${tag}`}>
            <Badge variant="outline" key={tag} className="mb-2">
              {toTitleCase(tag)}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreInfo;
