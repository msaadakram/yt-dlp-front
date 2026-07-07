import Link from 'next/link';

const POSTS = [
  { slug: 'how-to-download-4k',    title: 'How to Download 4K YouTube Videos in 2026',       date: 'Jun 28, 2026', tag: 'Tutorial',      read: '4 min', desc: 'Step-by-step guide to downloading Ultra HD 4K videos using GrabFlow Pro.' },
  { slug: 'best-video-formats',    title: 'MP4 vs MKV vs WEBM: Which Format Should You Use?', date: 'Jun 15, 2026', tag: 'Guide',         read: '6 min', desc: 'A deep comparison of the most popular video container formats for different use cases.' },
  { slug: 'grabflow-api-launch',   title: 'Introducing the GrabFlow Developer API',           date: 'Jun 1, 2026',  tag: 'Announcement',  read: '3 min', desc: 'Build powerful download integrations with our new public REST API.' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-3">GrabFlow Blog</h1>
          <p className="text-muted-foreground text-sm">Tutorials, guides, and product updates.</p>
        </div>
        <div className="flex flex-col gap-5">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-bold">{p.tag}</span>
                <span className="text-xs text-muted-foreground">{p.date} · {p.read} read</span>
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
