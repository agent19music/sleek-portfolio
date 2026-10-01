"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl italic text-neutral-950 dark:text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          This page failed to load. You can try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-800 transition-colors hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
