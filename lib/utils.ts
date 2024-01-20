import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function removeHtmlTags(str: string | undefined): string {
  if (!str) return "";
  return str.replace(/(<([^>]+)>)/gi, "");
}

export function toTitleCase(str: string): string {
  if (!str) return "";

  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
}

export function getSimilarTags(
  tags: string[],
  tag: string | undefined,
): string[] {
  if (!tag) return [];

  const similarTags: string[] = [];
  tags.forEach((t) => {
    if (t.includes(tag)) {
      similarTags.push(t);
    }
  });
  return similarTags;
}
