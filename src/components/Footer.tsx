import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-700/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-mist-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Oleksii Lavrenin</p>
        <div className="flex gap-5">
          <Link href="/#work" className="transition-colors hover:text-mist-200">
            Work
          </Link>
          <a
            href="mailto:alex.lavre2@gmail.com"
            className="transition-colors hover:text-mist-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
