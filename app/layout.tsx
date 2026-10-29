import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import ScrollProgress from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: "AERO × KOGLESH — Built Through Code. Proven Through Action.",
  description: "The independent portfolio of Koglesh R. Murugan: systems engineering, creative technology, AERO filmmaking and competitive Taekwondo.",
  applicationName: "AERO × KOGLESH",
  openGraph: {
    title: "AERO × KOGLESH",
    description: "A living index of systems, experiments and real-world discipline.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ScrollProgress />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}