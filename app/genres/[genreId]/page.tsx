import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import GenreInfo from "./_components/genre-info";
import Artists from "./_components/artists";
import { toTitleCase } from "@/lib/utils";
import Playlist from "./_components/playlist";

export async function generateMetadata({
  params,
}: {
  params: {
    genreId: string;
  };
}) {
  return {
    title: `${toTitleCase(decodeURIComponent(params.genreId))} - Spotstats`,
    description: `Spotstats - ${toTitleCase(
      decodeURIComponent(params.genreId),
    )}`,
    openGraph: {
      title: `${toTitleCase(decodeURIComponent(params.genreId))} - Spotstats`,
      description: `Spotstats - ${toTitleCase(
        decodeURIComponent(params.genreId),
      )}`,
      type: "website",
      url: `https://spotstats.net/genres/${params.genreId}`,
      site_name: "Spotstats",
    },
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
            <Playlist genre={props.params.genreId} className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
