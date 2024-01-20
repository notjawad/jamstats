"use client";

import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Tag } from "@/lib/spotify/types";
import { Spinner } from "@/components/spinner";
import axios from "axios";
import { removeHtmlTags } from "@/lib/utils";
import Artists from "./_components/artists";
import { useSession } from "next-auth/react";

const GenrePage = () => {
  const params = useParams<{ genreId: string }>();
  const { genreId } = params;

  const [genreInfo, setGenreInfo] = useState<Tag>();
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

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

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
            <div>
              <h1 className="mb-2 inline-block text-2xl font-extrabold tracking-tight">
                {genreInfo?.tag.name}
              </h1>
              <p className="mb-12 line-clamp-6 w-full text-sm text-muted-foreground xl:mr-64">
                {removeHtmlTags(genreInfo?.tag.wiki.content) ||
                  "No description available"}
              </p>
            </div>
            <Artists tag={genreInfo?.tag.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
