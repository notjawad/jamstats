import React, { ComponentProps } from "react";
import Link from "next/link";

import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";

interface GenreSectionProps extends ComponentProps<"div"> {
  timeframe: string;
  genres: { genre: string; count: number }[];
}

const GenreSection = ({
  genres,
  timeframe,
  className,
  ...props
}: GenreSectionProps) => {
  return (
    <div
      className="flex min-w-full items-center py-2 align-middle md:inline-block"
      {...props}
    >
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-300 border-white/10 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                #
              </th>
              <th className="border-b border-gray-300 border-white/10 px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {genres.map((genre, index) => (
              <tr key={genre.genre}>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <Link href={`/genres/${genre.genre}`} passHref>
                    <Badge
                      variant="outline"
                      className="group flex w-32 items-center justify-between"
                    >
                      <span className="truncate font-medium">
                        {genre.genre}
                      </span>
                      <ExternalLink className="h-3 w-3 text-black/50 dark:text-white/50" />
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

export default GenreSection;
