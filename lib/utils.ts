import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function removeHtmlTags(str: string | undefined): string {
  if (!str) return "";
  return str.replace(/(<([^>]+)>)/gi, "");
}
