import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-mist-400">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Nothing found here.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full border border-ink-600 px-6 py-3 text-sm text-mist-300 transition-colors hover:border-mist-400 hover:text-mist-200"
      >
        Back home
      </Link>
    </div>
  );
}
