import React, { useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { genres } from "@/lib/spotify/genre-array";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const AllGenresSection = () => {
  const [search, setSearch] = useState("");

  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mr-3.5 md:mr-0">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4"
        placeholder="Filter genres"
      />
      <ScrollArea className="mt-4 h-[400px] rounded-md border">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider dark:border-white/10">
                #
              </th>
              <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider dark:border-white/10">
                Genre
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {filteredGenres.slice(0, 50).map((genre, index) => (
              <tr key={genre + index}>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {index + 1}
                </td>
                <td className="flex items-center gap-x-2 whitespace-nowrap px-6 py-4 text-sm">
                  <Link href={`/genres/${genre}`}>
                    <Badge
                      variant="outline"
                      className="group flex w-32 items-center justify-between"
                    >
                      <span className="truncate font-medium">{genre}</span>
                      <ExternalLink className="h-3 w-3 text-white/50 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100" />
                    </Badge>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
};

export default AllGenresSection;
