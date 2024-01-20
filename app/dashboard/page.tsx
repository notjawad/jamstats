"use client";

import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
import TopArtists from "@/components/top-artists";
import TopTracks from "@/components/top-tracks";
import TopGenres from "@/components/top-genres";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Dashboard = () => {
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

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
            <div>
              <h1 className="mb-2 inline-block text-3xl font-extrabold tracking-tight">
                Dashboard
              </h1>
              <p className="text mb-12 text-muted-foreground xl:mr-64">
                Explore your top artists, tracks, and{" "}
                <Link
                  className="text-green-500 transition-colors duration-150 ease-in-out hover:text-green-600"
                  href="/genres"
                >
                  genres
                </Link>
              </p>
            </div>
            <TopArtists />
            <TopTracks className="mt-4" />
            <TopGenres className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
