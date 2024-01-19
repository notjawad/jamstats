"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { PopularGenres } from "@/components/popular-genres";

import AllGenresSection from "@/components/all-genres-section";

const GenresPage = () => {
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

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 pb-12 sm:px-6 md:px-12">
      <div className="min-w-full">
        <h1 className="mb-2 inline-block text-3xl font-extrabold tracking-tight">
          Genres
        </h1>
        <p className="text mb-12 xl:mr-64">
          Explore new songs, artists, and playlists by music genre.
        </p>
        <div className="pr-2.5 md:pr-0">
          <PopularGenres />
        </div>
        <h2 className="mt-4 text-xl font-semibold">All Genres</h2>
        <AllGenresSection />
      </div>
    </div>
  );
};

export default GenresPage;
