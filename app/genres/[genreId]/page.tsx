import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import GenreInfo from "./_components/genre-info";
import Artists from "./_components/artists";
import { toTitleCase } from "@/lib/utils";
import Playlist from "./_components/playlist";
import Users from "./_components/users";
import { BsSpotify } from "react-icons/bs";

export async function generateMetadata({
  params,
}: {
  params: {
    genreId: string;
  };
}) {
  return {
    title: `${toTitleCase(decodeURIComponent(params.genreId))} - Jamstats`,
    description: `Jamstats - ${toTitleCase(
      decodeURIComponent(params.genreId),
    )}`,
    openGraph: {
      title: `${toTitleCase(decodeURIComponent(params.genreId))} - Jamstats`,
      description: `Jamstats - ${toTitleCase(
        decodeURIComponent(params.genreId),
      )}`,
      type: "website",
      site_name: "Jamstats",
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

            <div className="px-[50px]">
              <Users className="mt-4" />
            </div>
            <Artists className="mt-4" />
            <Playlist genre={props.params.genreId} className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
