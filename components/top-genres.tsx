import React, { ComponentProps, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserSection from "@/components/user-section";
import GenreSection from "@/components/genre-section";

import { twMerge } from "tailwind-merge";
import { Artist } from "@/lib/spotify/types";

type Genre = {
  genre: string;
  count: number;
};

const TopGenres = ({ className, ...props }: ComponentProps<"div">) => {
  const { data: session, status } = useSession();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [timeframe, setTimeframe] = useState("short_term");

  useEffect(() => {
    if (!session) return;

    if (session && "access_token" in session) {
      axios
        .get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${timeframe}&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          },
        )
        .then((response) => {
          const allGenres = response.data.items.flatMap(
            (artist: Artist) => artist.genres,
          );
          const genreCounts = allGenres.reduce((counts: any, genre: string) => {
            counts[genre] = (counts[genre] || 0) + 1;
            return counts;
          }, {});

          const sortedGenres: Genre[] = Object.entries(genreCounts)
            .map(([genre, count]) => ({ genre, count: count as number }))
            .sort((a, b) => b.count - a.count);

          setGenres(sortedGenres);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session, timeframe]);

  return (
    <div {...props} className={twMerge(className)}>
      <UserSection label="Top Genres" />
      <Tabs defaultValue="short_term" className="mt-4">
        <TabsList className="w-full md:w-1/2">
          <TabsTrigger
            onClick={() => setTimeframe("short_term")}
            value="short_term"
          >
            Last month
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTimeframe("medium_term")}
            value="medium_term"
          >
            Last 6 months
          </TabsTrigger>
          <TabsTrigger
            onClick={() => setTimeframe("long_term")}
            value="long_term"
          >
            All time
          </TabsTrigger>
        </TabsList>
        <TabsContent value="short_term">
          <GenreSection genres={genres} timeframe="short_term" />
        </TabsContent>
        <TabsContent value="medium_term">
          <GenreSection genres={genres} timeframe="medium_term" />
        </TabsContent>
        <TabsContent value="long_term">
          <GenreSection genres={genres} timeframe="long_term" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TopGenres;
