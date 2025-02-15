import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let targetDate = new Date(date);

  let timezoneOffset = targetDate.getTimezoneOffset() * 60 * 1000;
  targetDate = new Date(targetDate.getTime() + timezoneOffset);

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate}`;
}
