import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zapa.tetebatu.com"),
  title: "Zaenul Padli (ZAPA) | Calon Kepala Desa Tetebatu Selatan 2027–2035",

  description:
    "Situs Resmi Zaenul Padli (ZAPA) - Calon Kepala Desa Tetebatu Selatan Periode 2027-2035. Mengabdi dengan Hati, Membangun dengan Bukti demi Kemakmuran Warga.",
  keywords: [
    "Zaenul Padli",
    "ZAPA",
    "Pilkades Tetebatu Selatan",
    "Calon Kepala Desa Tetebatu Selatan",
    "Tetebatu Selatan",
    "Lombok Timur",
    "Pokdarwis Tetebatu",
    "Lekong Pituk",
  ],
  authors: [{ name: "Tim Sahabat ZAPA" }],
  openGraph: {
    title: "Zaenul Padli (ZAPA) - Calon Kepala Desa Tetebatu Selatan 2027–2035",
    description:
      "Kenali Profil, Rekam Jejak, Visi-Misi & 5 Pilar Program Nyata Bapak Zaenul Padli untuk kemajuan dan kesejahteraan Desa Tetebatu Selatan.",
    url: "https://zapa.tetebatu.com",
    siteName: "Zaenul Padli (ZAPA) Official",
    images: [
      {
        url: "/images/profile-studio.jpeg",
        width: 1200,
        height: 1200,
        alt: "Zaenul Padli (ZAPA) - Calon Kepala Desa Tetebatu Selatan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaenul Padli (ZAPA) | Calon Kepala Desa Tetebatu Selatan 2027–2035",
    description: "Mengabdi dengan Hati, Membangun dengan Bukti untuk Tetebatu Selatan.",
    images: ["/images/profile-studio.jpeg"],
  },
  icons: {
    icon: "/images/profile-studio.jpeg",
    apple: "/images/profile-studio.jpeg",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#fcfdfc] text-slate-800">
        {children}
      </body>
    </html>
  );
}

