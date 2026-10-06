import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuri Marisa",
  description: "Portofolio Yuri Marisa",
  keywords: ["Yuri Marisa", "Ekonomi Pembangunan", "Universitas Riau", "BAPPEDA Bengkalis", "Riset Ekonometri", "EViews"],
  authors: [{ name: "Yuri Marisa" }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('yuri_theme');
                // Default adalah dark mode, kecuali jika user secara spesifik memilih 'light'
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased selection:bg-accent-soft selection:text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
