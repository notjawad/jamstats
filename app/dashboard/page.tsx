import React from "react";

import { redirect } from "next/navigation";

import TopArtists from "@/components/top-artists";
import TopTracks from "@/components/top-tracks";
import TopGenres from "@/components/top-genres";
import Link from "next/link";

import { getServerSession } from "next-auth";

export const metadata = {
  title: "Jamstats - Dashboard",
  description: "Jamstats is a tool for tracking your Spotify listening habits.",
};

const Dashboard = async () => {
  const session = await getServerSession();

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
