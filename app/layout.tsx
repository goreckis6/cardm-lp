import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://cardiom.health";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Cardiom — Your heart has a pattern",
      template: "%s — Cardiom",
    },
    description:
      "Measure pulse with Finger PPG or contactless Face rPPG on iPhone — plus personal wellness context and a private daily health journal.",
    icons: {
      icon: "/brand/app-icon.png",
      apple: "/brand/app-icon.png",
    },
    openGraph: {
      title: "Cardiom — Your heart has a pattern",
      description:
        "Finger PPG or Face rPPG pulse check-ins, clearer wellness context and your daily health journal — beautifully together.",
      type: "website",
      siteName: "Cardiom",
      images: [{ url: socialImage, width: 1731, height: 909 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cardiom — Your heart has a pattern",
      description:
        "Finger PPG or Face rPPG pulse check-ins, clearer wellness context and your daily journal.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
