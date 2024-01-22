"use client";

import React, { ComponentProps, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

import Link from "next/link";
import Image from "next/image";
import { BsSpotify } from "react-icons/bs";

import { redirect, useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface User {
  display_name: string;
  image_url: string;
  user_id: string;
}

const Users = ({ className, ...props }: ComponentProps<"div">) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const tag = (params.genreId as string).replace(/%20/g, "-");

  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/");
  }

  useEffect(() => {
    if (session && "access_token" in session) {
      const fetchUsers = async () => {
        try {
          const { data } = await axios.get(
            "https://jamstats-api.vercel.app/api/users",
            {
              params: {
                genreId: tag,
              },
            },
          );

          setUsers(data.users);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, [tag, session]);

  return (
    <div {...props} className={twMerge("", className)}>
      {users.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {users.map((user) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                key={user.user_id}
              >
                <Link
                  href={`https://open.spotify.com/user/${user.user_id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex flex-col items-center"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={user.image_url || "/images/placeholder.png"}
                      alt={user.display_name}
                      layout="fill"
                      className="rounded-full opacity-0 transition-opacity duration-500 ease-in-out"
                      loading="lazy"
                      onLoad={(image) => {
                        image.currentTarget.classList.remove("opacity-0");
                      }}
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-muted-foreground">
                    {user.display_name.length > 15
                      ? user.display_name.substring(0, 15) + "..."
                      : user.display_name}
                  </h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex items-center justify-center">
          {isLoading ? (
            <></>
          ) : (
            <div className="text-center">
              <BsSpotify className="mx-auto h-8 w-8" />
              <p className="mt-2 text-sm text-gray-500">
                No users found for this genre
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
