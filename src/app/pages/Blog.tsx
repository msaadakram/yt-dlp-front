import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Clock, ArrowRight, Bookmark, Share2,
  Tag, ChevronRight, TrendingUp, Rss,
} from "lucide-react";
import { Badge, Card, Avatar } from "../components/ui";

const CATEGORIES = ["All", "Tutorials", "Updates", "Tips & Tricks", "Developer", "Announcements"];

const POSTS = [
  {
    id: 1,
    slug: "how-to-download-4k-youtube",
    title: "How to Download 4K YouTube Videos Without Losing Quality",
    excerpt: "A step-by-step walkthrough for getting the highest possible quality from YouTube — including HDR and AV1 formats that most tools miss.",
    category: "Tutorials",
    author: { name: "Mia Chen", initials: "MC", color: "bg-primary" },
    date: "Nov 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&auto=format",
    featured: true,
    tags: ["YouTube", "4K", "Video Quality"],
  },
  {
    id: 2,
    slug: "grabflow-api-v2",
    title: "Introducing GrabFlow API v2: Webhooks, Batch Jobs & Go SDK",
    excerpt: "Our most requested developer features are here. Process 200 URLs in a single request, get push notifications, and build with Go.",
    category: "Announcements",
    author: { name: "Dev Team", initials: "DT", color: "bg-violet-500" },
    date: "Nov 20, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop&auto=format",
    featured: true,
    tags: ["API", "Developer", "New Feature"],
  },
  {
    id: 3,
    slug: "instagram-reels-download-guide",
    title: "The Complete Guide to Downloading Instagram Reels in 2024",
    excerpt: "Instagram makes it tricky to save Reels — here's how to download them in full resolution, including stories and carousels.",
    category: "Tutorials",
    author: { name: "Layla Hassan", initials: "LH", color: "bg-pink-500" },
    date: "Nov 14, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=450&fit=crop&auto=format",
    featured: false,
    tags: ["Instagram", "Reels", "Guide"],
  },
  {
    id: 4,
    slug: "audio-extraction-tips",
    title: "5 Tips for Perfect Audio Extraction from Any Video",
    excerpt: "Get studio-quality audio from video files. We cover bitrate, format choice, and post-processing tricks for podcasters and music producers.",
    category: "Tips & Tricks",
    author: { name: "James O.", initials: "JO", color: "bg-emerald-500" },
    date: "Nov 8, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop&auto=format",
    featured: false,
    tags: ["Audio", "MP3", "WAV", "Tips"],
  },
  {
    id: 5,
    slug: "batch-download-workflow",
    title: "Building a Batch Download Workflow with the GrabFlow API",
    excerpt: "Automate bulk video archiving for your team using our batch endpoint, webhooks, and a simple Node.js worker script.",
    category: "Developer",
    author: { name: "Dev Team", initials: "DT", color: "bg-violet-500" },
    date: "Oct 31, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&auto=format",
    featured: false,
    tags: ["API", "Node.js", "Automation"],
  },
  {
    id: 6,
    slug: "tiktok-download-no-watermark",
    title: "How to Download TikTok Videos Without Watermarks",
    excerpt: "GrabFlow removes TikTok watermarks automatically. Here's why it matters for creators and how the process works under the hood.",
    category: "Tutorials",
    author: { name: "Mia Chen", initials: "MC", color: "bg-primary" },
    date: "Oct 24, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&h=450&fit=crop&auto=format",
    featured: false,
    tags: ["TikTok", "Watermark", "Creators"],
  },
  {
    id: 7,
    slug: "grabflow-changelog-october",
    title: "October Changelog: Subtitle Downloads, Spotify Support & More",
    excerpt: "A roundup of everything we shipped in October — 11 new platforms, SRT subtitle extraction, and a brand-new mobile-optimised UI.",
    category: "Updates",
    author: { name: "Dev Team", initials: "DT", color: "bg-violet-500" },
    date: "Oct 15, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop&auto=format",
    featured: false,
    tags: ["Changelog", "Subtitles", "Spotify"],
  },
];

function PostCard({ post, featured = false }: { post: typeof POSTS[0]; featured?: boolean }) {
  const [saved, setSaved] = useState(false);

  if (featured) {
    return (
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge variant="pro">{post.category}</Badge>
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {post.tags.slice(0, 2).map((t) => (
                <span key={t} className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-extrabold text-lg text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Avatar initials={post.author.initials} size="sm" color={post.author.color} />
              <div>
                <p className="text-xs font-semibold text-foreground">{post.author.name}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span>{post.date}</span>
                  <span>·</span>
                  <Clock className="w-2.5 h-2.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSaved(!saved)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${saved ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-primary"}`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
              <a href="#" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Read <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex gap-4 p-4 group hover:shadow-md transition-shadow">
      <div className="relative w-24 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wide">{post.category}</span>
          <span className="text-[10px] text-muted-foreground">·</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{post.readTime}</span>
        </div>
        <h3 className="font-bold text-sm text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{post.excerpt}</p>
        <div className="flex items-center gap-2">
          <Avatar initials={post.author.initials} size="sm" color={post.author.color} />
          <span className="text-xs text-muted-foreground">{post.author.name} · {post.date}</span>
        </div>
      </div>
    </Card>
  );
}

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const featured = POSTS.filter((p) => p.featured);
  const filtered = POSTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && !p.featured;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 text-center">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <Badge variant="muted">Blog</Badge>
          <h1 className="mt-4 mb-4">
            Tips, Updates &{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tutorials
            </span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Guides for creators, developers, and power users. New posts every week.
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3 max-w-lg mx-auto shadow-sm">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </section>

      {/* Category filter */}
      <div className="border-b border-border sticky top-16 z-40 bg-card/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                category === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured posts */}
        {category === "All" && !search && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-bold">Featured</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {featured.map((p) => <PostCard key={p.id} post={p} featured />)}
            </div>
          </div>
        )}

        {/* All posts */}
        <div className="flex items-center gap-2 mb-5">
          <Tag className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-bold">
            {category === "All" ? "Latest Articles" : category}
            <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
          </h2>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No articles found</p>
            <p className="text-sm mt-1">Try a different search term or category.</p>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
            <Rss className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Stay in the loop</h2>
          <p className="text-muted-foreground text-sm mb-6">
            New tutorials and updates, straight to your inbox. No spam, ever. Unsubscribe anytime.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex-shrink-0">
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">3,200+ subscribers. Published every Tuesday.</p>
        </div>
      </section>
    </div>
  );
}
