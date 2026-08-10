import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Backdrop } from "@/components/Backdrop";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://oleksiilavrenin.com"),
  title: {
    default: "Oleksii Lavrenin — AI / ML Engineer",
    template: "%s · Oleksii Lavrenin",
  },
  description:
    "Selected work in reinforcement learning, multi-agent simulation, and applied machine learning.",
  openGraph: {
    type: "website",
    title: "Oleksii Lavrenin — AI / ML Engineer",
    description:
      "Selected work in reinforcement learning, multi-agent simulation, and applied machine learning.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="font-sans antialiased">
        <Backdrop />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
