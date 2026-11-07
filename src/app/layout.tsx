import type { Metadata } from "next";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/inter";
import "@fontsource/caveat";
import "./globals.css";

export const metadata: Metadata = {
  title: "milosentral",
  description: "a personal note.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased selection:bg-[#E8E2D5] selection:text-[#1C1B19]"
    >
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#1C1B19] overflow-x-hidden paper-surface">
        {children}
      </body>
    </html>
  );
}
