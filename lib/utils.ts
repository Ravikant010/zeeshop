import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { db } from "@/db/schema";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



