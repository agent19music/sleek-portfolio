import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">404</p>
        <h1 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl italic text-neutral-950 dark:text-white">
          This page does not exist
        </h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
