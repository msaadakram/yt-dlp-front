import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GrabFlow — Fast Video Downloader',
  description: 'Download videos from YouTube, Instagram, TikTok and 1000+ sites — fast, private, free.',
  keywords: ['video downloader', 'youtube downloader', 'yt-dlp', 'mp3', 'mp4'],
  openGraph: {
    title: 'GrabFlow — Fast Video Downloader',
    description: 'Download videos from YouTube, Instagram, TikTok and 1000+ sites.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
