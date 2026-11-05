import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Liens et navigation qui tiennent compte de la langue
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
