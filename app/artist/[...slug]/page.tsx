import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import ArtistOverview from "./_components/artist-overview";

const GenrePage = async (props: { params: any }) => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <div className="container">
        <div className="mx-auto">
          <div className="pb-10">
            <ArtistOverview artistName={props.params.slug[1]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
