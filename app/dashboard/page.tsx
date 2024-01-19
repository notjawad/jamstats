"use client";

import React from "react";

import { Spinner } from "@/components/spinner";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import TopArtists from "@/components/top-artists";
import TopTracks from "@/components/top-tracks";
import TopGenres from "@/components/top-genres";

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

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
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
