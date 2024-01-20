import { redirect, useSearchParams } from "next/navigation";

import GenreInfo from "./_components/genre-info";
import { getServerSession } from "next-auth/next";
import Artists from "./_components/artists";
import { toTitleCase } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: {
    genreId: string;
  };
}) {
  return {
    title: `${toTitleCase(decodeURIComponent(params.genreId))} - Spotstats`,
  };
}

const GenrePage = async (props: {
  params: { genreId: string };
  searchParams: {};
}) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  await generateMetadata(props);

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
            <GenreInfo />
            <Artists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
