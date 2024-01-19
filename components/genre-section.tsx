import React, { ComponentProps } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";

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
    <div className="inline-block min-w-full py-2 align-middle" {...props}>
      <ScrollArea className="h-[400px] rounded-md border p-4">
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
                  <Link href={`/genres/${genre.genre}`}>{genre.genre}</Link>
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
