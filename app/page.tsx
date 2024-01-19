"use client";

import { useSession } from "next-auth/react";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import Hero from "@/components/hero";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto w-screen max-w-3xl px-4 sm:px-6 md:px-12">
      <Hero />
    </main>
  );
}
