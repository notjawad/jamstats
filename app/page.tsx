import { redirect } from "next/navigation";
import Hero from "@/components/hero";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Jamstats",
  description: "Jamstats is a tool for tracking your Spotify listening habits.",
};

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <Hero />
    </main>
  );
}
