export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading</p>
    </div>
  );
}
