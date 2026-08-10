import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-ink-700/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 text-sm text-mist-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Oleksii Lavrenin</p>

        <div className="flex gap-5">
          <Link href="/#work" className="transition-colors hover:text-mist-200">
            Work
          </Link>
          <Link href="/about" className="transition-colors hover:text-mist-200">
            Experience
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-mist-200"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-mist-200"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
