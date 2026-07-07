import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <p className="text-8xl font-extrabold text-primary/20 mb-4">404</p>
      <h2 className="text-2xl font-extrabold mb-2">Page not found</h2>
      <p className="text-muted-foreground text-sm mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors">Go home</Link>
    </div>
  );
}
