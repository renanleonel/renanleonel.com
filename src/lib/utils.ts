import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  let currentDate = new Date();
  let targetDate = new Date(date);

  let timezoneOffset = targetDate.getTimezoneOffset() * 60 * 1000;
  targetDate = new Date(targetDate.getTime() + timezoneOffset);

  let timeDifference = currentDate.getTime() - targetDate.getTime();

  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  let formattedDate = "";

  if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}
