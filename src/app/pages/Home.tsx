import { useState } from "react";
import { Link } from "react-router";
import {
  Download, Play, Music, Video, Zap, Shield, Globe, ChevronDown,
  Check, Star, ArrowRight, Copy, X, Search, Twitter,
  Youtube, Instagram, Facebook, Tv, Clock, FileVideo, FileAudio,
  Sparkles, Lock, HardDrive, Wifi, Heart, Share2, BarChart2, Settings,
  ChevronRight, Layers, TrendingUp, User, Bell,
} from "lucide-react";
import {
  Badge, Card, Avatar, Divider, Toggle, Spinner,
  Alert, ProgressBar, Tooltip,
} from "../components/ui";
import { Loader2 } from "lucide-react";

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: "youtube",     name: "YouTube",      color: "#FF0000", bg: "#fff0f0", icon: Youtube },
  { id: "instagram",   name: "Instagram",    color: "#E1306C", bg: "#fff0f5", icon: Instagram },
  { id: "tiktok",      name: "TikTok",       color: "#010101", bg: "#f0f0f0", icon: Tv },
  { id: "facebook",    name: "Facebook",     color: "#1877F2", bg: "#f0f5ff", icon: Facebook },
  { id: "twitter",     name: "Twitter/X",    color: "#000000", bg: "#f0f0f0", icon: Twitter },
  { id: "twitch",      name: "Twitch",       color: "#9146FF", bg: "#f5f0ff", icon: Play },
  { id: "vimeo",       name: "Vimeo",        color: "#1AB7EA", bg: "#f0faff", icon: Video },
  { id: "reddit",      name: "Reddit",       color: "#FF4500", bg: "#fff2f0", icon: Globe },
  { id: "pinterest",   name: "Pinterest",    color: "#E60023", bg: "#fff0f0", icon: Heart },
  { id: "dailymotion", name: "Dailymotion",  color: "#0066DC", bg: "#f0f5ff", icon: Play },
  { id: "soundcloud",  name: "SoundCloud",   color: "#FF5500", bg: "#fff2ee", icon: Music },
  { id: "spotify",     name: "Spotify",      color: "#1DB954", bg: "#f0fff4", icon: Music },
];

const FORMATS = [
  { label: "MP4 4K",    sub: "2160p Ultra HD",     icon: FileVideo, badge: "PRO", color: "text-purple-600" },
  { label: "MP4 1080p", sub: "Full HD",             icon: FileVideo, badge: null,  color: "text-blue-600" },
  { label: "MP4 720p",  sub: "HD Ready",            icon: FileVideo, badge: null,  color: "text-blue-500" },
  { label: "MP4 480p",  sub: "Standard",            icon: FileVideo, badge: null,  color: "text-sky-500" },
  { label: "MP3 320kbps", sub: "High quality audio", icon: FileAudio, badge: "HOT", color: "text-pink-500" },
  { label: "MP3 128kbps", sub: "Standard audio",    icon: FileAudio, badge: null,  color: "text-pink-400" },
  { label: "WAV",       sub: "Lossless audio",      icon: FileAudio, badge: "PRO", color: "text-violet-500" },
  { label: "WEBM",      sub: "Web optimized",       icon: FileVideo, badge: null,  color: "text-emerald-500" },
];

const FEATURES = [
  { icon: Zap,       title: "Lightning Fast",    desc: "Download at maximum speed with our optimized servers distributed worldwide." },
  { icon: Shield,    title: "100% Safe",         desc: "No malware, no ads injected, no tracking. Pure downloads, always clean." },
  { icon: Globe,     title: "1000+ Sites",        desc: "Supports over 1,000 video and audio platforms from around the globe." },
  { icon: HardDrive, title: "No Registration",   desc: "No account required. Paste, click, download — done in three steps." },
  { icon: Lock,      title: "Private & Secure",  desc: "Your URLs are never stored. Zero logs, zero history, maximum privacy." },
  { icon: Wifi,      title: "Always Online",     desc: "99.9% uptime guaranteed with automatic failover across our server fleet." },
];

const PLANS = [
  { name: "Free",  price: "$0",  period: "/forever", desc: "Perfect for occasional downloads", features: ["720p max resolution", "5 downloads/day", "MP4 & MP3 only", "Standard speed", "Watermark-free"], cta: "Start Free",   highlight: false, badge: null },
  { name: "Pro",   price: "$9",  period: "/month",   desc: "For power users and creators",      features: ["4K Ultra HD", "Unlimited downloads", "All formats", "Priority speed", "Batch downloads", "No ads"], cta: "Go Pro", highlight: true, badge: "Most Popular" },
  { name: "Team",  price: "$29", period: "/month",   desc: "For agencies and teams",             features: ["Everything in Pro", "5 team seats", "API access", "Dedicated support", "Custom integrations", "White-label"], cta: "Start Trial", highlight: false, badge: null },
];

const FAQS = [
  { q: "Is it legal to download videos?", a: "Downloading for personal use is generally acceptable in most countries. Always respect copyright and the platform's terms of service." },
  { q: "How do I download a video?", a: "Copy the video URL from any supported platform, paste it into the input field above, select your preferred format and quality, then click Download." },
  { q: "What's the maximum quality available?", a: "Free users can download up to 720p HD. Pro subscribers unlock 4K Ultra HD and lossless audio formats like WAV and FLAC." },
  { q: "Do you store my downloads?", a: "No. We generate a temporary download link and delete all data immediately after. We store zero logs or URLs on our servers." },
];

const STATS = [
  { value: "120M+", label: "Downloads served" },
  { value: "1,000+", label: "Supported platforms" },
  { value: "4K",     label: "Max quality" },
  { value: "99.9%",  label: "Uptime" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | "success">(null);
  const [format, setFormat] = useState("MP4 1080p");
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => { setLoading(false); setResult("success"); }, 1800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-24 px-4">
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          1,000+ platforms supported · 4K · MP3 · No signup
        </div>

        <h1 className="mb-5 text-foreground">
          Download Any Video<br />
          <span className="bg-gradient-to-r from-primary via-violet-500 to-accent bg-clip-text text-transparent">
            From Any Platform
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Paste a link from YouTube, Instagram, TikTok, Facebook — and instantly grab
          the video or audio in the quality you want. Fast, free, no tracking.
        </p>

        <Card className="p-2 max-w-2xl mx-auto shadow-xl shadow-black/5">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-input-background rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="url"
                placeholder="Paste video URL from YouTube, TikTok, Instagram…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-0"
              />
              {url && (
                <button onClick={handleCopy} className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
              {url && (
                <button onClick={() => { setUrl(""); setResult(null); }} className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="hidden sm:block bg-muted text-foreground text-sm font-medium rounded-xl px-3 py-3 outline-none border border-border cursor-pointer"
            >
              {["MP4 1080p", "MP4 720p", "MP4 4K", "MP4 480p", "MP3 320kbps", "MP3 128kbps", "WAV"].map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <button
              onClick={handleDownload}
              disabled={loading || !url.trim()}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25 flex-shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">{loading ? "Fetching…" : "Download"}</span>
            </button>
          </div>

          {result === "success" && (
            <div className="mt-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-sm">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-emerald-800">Ready!</span>
                <span className="text-emerald-600 ml-1">Your {format} file is ready to download.</span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex-shrink-0">
                <Download className="w-3 h-3" /> Save
              </button>
            </div>
          )}
        </Card>

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["MP4 4K", "MP4 HD", "MP3", "WAV", "Subtitles", "Thumbnail"].map((f) => (
            <button
              key={f}
              className="px-3 py-1 rounded-full text-xs font-medium bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Platforms ────────────────────────────────────────────────────────────────

function Platforms() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="muted">Platform Support</Badge>
          <h2 className="mt-3 mb-3">Works Everywhere You Watch</h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            From mainstream giants to niche streaming sites — if it plays in a browser, we can grab it.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {PLATFORMS.map((p) => {
            const Icon = p.icon;
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(isActive ? null : p.id)}
                className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-200 text-center cursor-pointer ${
                  isActive ? "border-primary bg-secondary shadow-md shadow-primary/10 scale-[1.02]" : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                  <Icon className="w-5 h-5" style={{ color: p.color }} />
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">{p.name}</span>
                {isActive && <Badge variant="success">Active</Badge>}
              </button>
            );
          })}
          <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-dashed border-border bg-card/50 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Globe className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground">+988 more</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Formats ─────────────────────────────────────────────────────────────────

function Formats() {
  const [selected, setSelected] = useState("MP4 1080p");
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="muted">Output Formats</Badge>
            <h2 className="mt-3 mb-4">Every Format You Need</h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
              Choose from a wide range of video and audio quality options. Pro subscribers unlock
              4K Ultra HD and lossless WAV audio — download once, use anywhere.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {FORMATS.map((f) => {
                const Icon = f.icon;
                const isSelected = selected === f.label;
                return (
                  <button
                    key={f.label}
                    onClick={() => setSelected(f.label)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
                      isSelected ? "bg-secondary border-primary shadow-sm" : "bg-card border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4 h-4 ${f.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{f.label}</p>
                      <p className="text-xs text-muted-foreground">{f.sub}</p>
                    </div>
                    {f.badge && <Badge variant={f.badge === "PRO" ? "pro" : "hot"}>{f.badge}</Badge>}
                    {isSelected && <Check className="w-4 h-4 text-primary flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Card className="p-5 overflow-hidden">
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br from-primary to-accent" />
                <Play className="w-12 h-12 text-white/80" />
                <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-primary rounded-full" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Youtube className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">How to Build a SaaS in 30 Days</p>
                  <p className="text-xs text-muted-foreground">techwithtim · 1.4M views · 24 min</p>
                </div>
              </div>
              <Divider label="download as" />
              <div className="flex flex-wrap gap-2 mt-1">
                {["MP4 4K", "MP4 1080p", "MP3", "WAV"].map((f) => (
                  <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${f === "MP4 1080p" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border text-muted-foreground hover:border-primary/50"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <button className="mt-4 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                <Download className="w-4 h-4" /> Download MP4 1080p
              </button>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Downloading…</p>
                <Badge variant="new">67%</Badge>
              </div>
              <ProgressBar value={67} />
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>267 MB / 400 MB</span>
                <span>12.4 MB/s</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="muted">Why GrabFlow</Badge>
          <h2 className="mt-3 mb-3">Built for Speed. Designed for Privacy.</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">No compromise on quality, speed, or your security.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Card key={f.title} className="p-6 group hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { name: "Priya Mehta", role: "Content Creator", text: "GrabFlow saves me 2 hours every week. The 4K quality is perfect for repurposing content.", avatar: "PM", rating: 5 },
            { name: "Alex Rodriguez", role: "Video Editor", text: "Finally a downloader that doesn't push malware. Clean, fast, reliable. The WAV audio is a lifesaver.", avatar: "AR", rating: 5 },
            { name: "Seo-yun Park", role: "Social Media Manager", text: "Batch downloads on the Team plan changed everything. We archive hundreds of reference clips weekly.", avatar: "SP", rating: 5 },
          ].map((t) => (
            <Card key={t.name} className="p-5">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-2.5">
                <Avatar initials={t.avatar} size="sm" color="bg-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing preview ──────────────────────────────────────────────────────────

function PricingPreview() {
  const [annual, setAnnual] = useState(false);
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="muted">Pricing</Badge>
          <h2 className="mt-3 mb-3">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-sm mb-6">No hidden fees. No data selling. Just downloads.</p>
          <div className="inline-flex items-center gap-1 bg-muted rounded-xl p-1">
            <button onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              Annual <Badge variant="new">-20%</Badge>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 flex flex-col gap-5 transition-all ${p.highlight ? "bg-primary border-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.02]" : "bg-card border-border hover:shadow-md"}`}>
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full shadow-md">{p.badge}</span>
                </div>
              )}
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.name}</p>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {annual && p.price !== "$0" ? `$${Math.round(parseInt(p.price.slice(1)) * 0.8)}` : p.price}
                  </span>
                  <span className={`text-sm mb-1 ${p.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{p.period}</span>
                </div>
                <p className={`text-sm mt-1 ${p.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.desc}</p>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? "bg-white/20" : "bg-secondary"}`}>
                      <Check className={`w-2.5 h-2.5 ${p.highlight ? "text-white" : "text-primary"}`} />
                    </div>
                    <span className={`text-sm ${p.highlight ? "text-primary-foreground/90" : "text-foreground"}`}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup" className={`w-full py-3 rounded-xl font-semibold text-sm transition-all text-center ${p.highlight ? "bg-white text-primary hover:bg-white/90 shadow-lg" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/15"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/pricing" className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
            See full feature comparison <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Design System Showcase ───────────────────────────────────────────────────

function DesignSystem() {
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <section className="py-20 px-4 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="muted">Design System</Badge>
          <h2 className="mt-3 mb-3">UI Component Library</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Every primitive used across GrabFlow.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Color Palette</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Primary",     cls: "bg-primary",     text: "text-primary-foreground" },
                { name: "Accent",      cls: "bg-accent",      text: "text-accent-foreground" },
                { name: "Secondary",   cls: "bg-secondary",   text: "text-secondary-foreground" },
                { name: "Muted",       cls: "bg-muted",       text: "text-muted-foreground" },
                { name: "Success",     cls: "bg-emerald-500", text: "text-white" },
                { name: "Warning",     cls: "bg-amber-400",   text: "text-white" },
                { name: "Destructive", cls: "bg-destructive", text: "text-destructive-foreground" },
                { name: "Background",  cls: "bg-background border border-border", text: "text-foreground" },
              ].map((c) => (
                <div key={c.name} className={`${c.cls} rounded-xl px-3 py-2 flex items-center justify-between`}>
                  <span className={`text-xs font-semibold ${c.text}`}>{c.name}</span>
                  <span className={`text-[10px] font-mono ${c.text} opacity-70`}>token</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Typography Scale</h3>
            <div className="flex flex-col gap-3">
              <div><p className="text-[10px] text-muted-foreground font-mono mb-0.5">Display — Plus Jakarta Sans 800</p><p className="text-3xl font-extrabold leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>The Quick Brown Fox</p></div>
              <div className="h-px bg-border" />
              <div><p className="text-[10px] text-muted-foreground font-mono mb-0.5">H2 — 700</p><p className="text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Section Heading</p></div>
              <div><p className="text-[10px] text-muted-foreground font-mono mb-0.5">H3 — 600</p><p className="text-lg font-semibold">Card Title</p></div>
              <div><p className="text-[10px] text-muted-foreground font-mono mb-0.5">Body — Inter 400</p><p className="text-sm text-muted-foreground leading-relaxed">Regular body text for reading, descriptions, and support copy.</p></div>
              <div><p className="text-[10px] text-muted-foreground font-mono mb-0.5">Mono — DM Mono 400</p><p className="text-xs font-mono text-muted-foreground">STATUS · 12.4 MB/s · 100%</p></div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 flex items-center gap-2"><Download className="w-4 h-4" /> Primary</button>
              <button className="px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors">Secondary</button>
              <button className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:bg-muted transition-colors">Outline</button>
              <button className="px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors shadow-md shadow-accent/20">Accent</button>
              <button disabled className="px-4 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed opacity-60">Disabled</button>
              <button className="px-4 py-2.5 rounded-xl text-sm font-semibold text-primary hover:bg-secondary transition-colors flex items-center gap-1">Ghost <ArrowRight className="w-3.5 h-3.5" /></button>
              <button className="w-9 h-9 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"><Settings className="w-4 h-4" /></button>
            </div>
            <div className="h-px bg-border my-4" />
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">XS</button>
              <button className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">SM</button>
              <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold">MD</button>
              <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-lg font-semibold">LG</button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Badges & Alerts</h3>
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge>Default</Badge><Badge variant="pro">Pro</Badge><Badge variant="hot">Hot</Badge>
              <Badge variant="new">New</Badge><Badge variant="success">Success</Badge><Badge variant="muted">Muted</Badge>
            </div>
            <div className="flex flex-col gap-2.5">
              <Alert type="info" title="Information">Your download will process immediately.</Alert>
              <Alert type="success" title="Download complete">File saved to your downloads folder.</Alert>
              <Alert type="warning" title="Rate limit approaching">2 free downloads remaining today.</Alert>
              <Alert type="error" title="Invalid URL">Please check the URL and try again.</Alert>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Tabs & Toggles</h3>
            <div className="flex bg-muted rounded-xl p-1 mb-5 gap-1">
              {["Video", "Audio", "Subtitles", "Thumbnail"].map((t, i) => (
                <button key={t} onClick={() => setTabIdx(i)} className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${tabIdx === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground min-h-[40px] mb-5">
              {["Download the full video in your chosen resolution.", "Extract audio as MP3 or WAV.", "Download auto-generated subtitles as SRT.", "Save the video thumbnail at full resolution."][tabIdx]}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold">Auto-detect quality</p><p className="text-xs text-muted-foreground">Highest available quality</p></div>
                <Toggle checked={toggleA} onChange={() => setToggleA(!toggleA)} />
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-sm font-semibold">Audio only</p><p className="text-xs text-muted-foreground">Save as MP3 or WAV</p></div>
                <Toggle checked={toggleB} onChange={() => setToggleB(!toggleB)} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Share2 className="w-4 h-4 text-primary" /> Avatars & Tooltips</h3>
            <div className="flex items-center gap-3 mb-5">
              <Avatar initials="MC" size="lg" color="bg-primary" />
              <Avatar initials="AR" size="md" color="bg-accent" />
              <Avatar initials="SP" size="sm" color="bg-emerald-500" />
              <div className="flex -space-x-2">
                {["bg-primary", "bg-accent", "bg-amber-500", "bg-emerald-500"].map((c, i) => (
                  <Avatar key={i} initials="+" size="sm" color={c} />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {[{ tip: "Download", icon: Download }, { tip: "Share", icon: Share2 }, { tip: "Statistics", icon: BarChart2 }, { tip: "Settings", icon: Settings }].map(({ tip, icon: Icon }) => (
                <Tooltip key={tip} label={tip}>
                  <button className="w-9 h-9 rounded-xl bg-muted hover:bg-secondary transition-colors flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </button>
                </Tooltip>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="muted">FAQ</Badge>
          <h2 className="mt-3">Common Questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <Card key={i} className="overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent p-12 text-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative">
            <h2 className="text-white text-3xl font-extrabold mb-3">Ready to Download Anything?</h2>
            <p className="text-white/70 text-sm max-w-sm mx-auto mb-8">Join 4 million users who trust GrabFlow every day.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup" className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-colors shadow-xl flex items-center gap-2">
                <Download className="w-4 h-4" /> Start Downloading Free
              </Link>
              <Link to="/pricing" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/20 flex items-center gap-2">
                View Pro Plans <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Platforms />
      <Formats />
      <Features />
      <PricingPreview />
      <DesignSystem />
      <FAQ />
      <CTA />
    </>
  );
}
