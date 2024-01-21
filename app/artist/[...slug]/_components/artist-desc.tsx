import React, { ReactNode, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import ArtistTopTracks from "./artist-top-tracks";
import ArtistAlbums from "./artist-albums";

interface ChildProps {
  tag?: keyof JSX.IntrinsicElements;
  attributes?: React.HTMLAttributes<HTMLElement>;
  children?: ReactNode[];
}

interface DescriptionProps {
  description?: ChildProps;
  avatar: string;
  artistName: string;
}

export const ArtistDescription: React.FC<DescriptionProps> = ({
  description,
  avatar,
  artistName,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const renderChildren = (children: ReactNode[] = []): ReactNode[] => {
    return children.map((child, index) => renderChild(child, index));
  };

  const renderChild = (child: ReactNode, index: number) => {
    if (typeof child === "object" && child !== null && "tag" in child) {
      const { tag, attributes, children } = child as ChildProps;

      if (!tag) {
        return null;
      }

      if (tag === "br") {
        return null;
      }

      if (tag === "a" && attributes) {
        attributes.className = "text-emerald-500";
      }

      if (tag === "p" && children) {
        return React.createElement(
          tag,
          {
            key: index,
            ...(attributes || {}),
            className: "my-4",
          },
          renderChildren(children),
        );
      }

      if (tag === "blockquote" && children) {
        return (
          <div
            key={index}
            className="relative rounded-md border border-black/10 p-4 dark:border-white/10"
          >
            <div className="flex items-center gap-x-2">
              <Image
                src={avatar}
                alt="avatar"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-sm text-muted-foreground">
                {artistName}
              </span>
            </div>
            <div className="relative pl-8">
              <Quote className="absolute left-0 top-0  mt-1" />
              {React.createElement(tag, attributes, renderChildren(children))}
            </div>
          </div>
        );
      }

      return React.createElement(
        tag,
        { key: index, ...(attributes || {}) },
        renderChildren(children),
      );
    }
    return child;
  };

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <div className="text-sm text-muted-foreground">
      {description ? (
        <>
          {renderChildren(
            showFullDescription
              ? description.children
              : [description.children && description.children[0]],
          )}
          <div onClick={toggleDescription}>
            {showFullDescription ? (
              <Button className="font-semibold" size="sm" variant="outline">
                Read Less
              </Button>
            ) : (
              <Button className="font-semibold" size="sm" variant="outline">
                Read More
              </Button>
            )}
          </div>
          <ArtistTopTracks className="mt-3" />
          <ArtistAlbums className="mt-3" />
        </>
      ) : (
        <p>Description not available</p>
      )}
    </div>
  );
};

export default ArtistDescription;
