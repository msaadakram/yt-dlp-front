'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Download, Play, Music, Video, Zap, Shield, Globe,
  Check, Star, Copy, X, Search, Twitter,
  Youtube, Instagram, Facebook, Tv, FileVideo, FileAudio,
  Sparkles, Lock, HardDrive, Wifi, Heart, ChevronRight,
  ChevronDown, Loader2
} from 'lucide-react';

const PLATFORMS = [
  { id: 'youtube',     name: 'YouTube',     color: '#FF0000', bg: '#fff0f0', icon: Youtube },
  { id: 'instagram',   name: 'Instagram',   color: '#E1306C', bg: '#fff0f5', icon: Instagram },
  { id: 'tiktok',      name: 'TikTok',      color: '#010101', bg: '#f0f0f0', icon: Tv },
  { id: 'facebook',    name: 'Facebook',    color: '#1877F2', bg: '#f0f5ff', icon: Facebook },
  { id: 'twitter',     name: 'Twitter/X',   color: '#000000', bg: '#f0f0f0', icon: Twitter },
  { id: 'twitch',      name: 'Twitch',      color: '#9146FF', bg: '#f5f0ff', icon: Play },
  { id: 'vimeo',       name: 'Vimeo',       color: '#1AB7EA', bg: '#f0faff', icon: Video },
  { id: 'soundcloud',  name: 'SoundCloud',  color: '#FF5500', bg: '#fff2ee', icon: Music },
];

const FEATURES = [
  { icon: Zap,       title: 'Lightning Fast',   desc: 'Download at maximum speed with our optimized servers distributed worldwide.' },
  { icon: Shield,    title: '100% Safe',        desc: 'No malware, no ads injected, no tracking. Pure downloads, always clean.' },
  { icon: Globe,     title: '1000+ Sites',      desc: 'Supports over 1,000 video and audio platforms from around the globe.' },
  { icon: HardDrive, title: 'No Registration',  desc: 'No account required. Paste, click, download — done in three steps.' },
  { icon: Lock,      title: 'Private & Secure', desc: 'Your URLs are never stored. Zero logs, zero history, maximum privacy.' },
  { icon: Wifi,      title: 'Always Online',    desc: '99.9% uptime guaranteed with automatic failover across our server fleet.' },
];

const FAQS = [
  { q: 'Is it legal to download videos?',         a: 'Downloading for personal use is generally acceptable in most countries. Always respect copyright and the platform\'s terms of service.' },
  { q: 'How do I download a video?',              a: 'Copy the video URL from any supported platform, paste it into the input field, select your format, then click Download.' },
  { q: 'What is the maximum quality available?',  a: 'Free users get up to 720p HD. Pro subscribers unlock 4K Ultra HD and lossless audio.' },
  { q: 'Do you store my downloads?',              a: 'No. We generate a temporary link and delete all data immediately after. Zero logs, zero history.' },
];

const STATS = [
  { value: '120M+',  label: 'Downloads served' },
  { value: '1,000+', label: 'Supported platforms' },
  { value: '4K',     label: 'Max quality' },
  { value: '99.9%',  label: 'Uptime' },
];

const PLANS = [
  { name: 'Free', price: '$0',  period: '/forever', desc: 'Perfect for occasional downloads', features: ['720p max resolution', '5 downloads/day', 'MP4 & MP3 only', 'Standard speed'], cta: 'Start Free', highlight: false },
  { name: 'Pro',  price: '$9',  period: '/month',   desc: 'For power users and creators',      features: ['4K Ultra HD', 'Unlimited downloads', 'All formats', 'Priority speed', 'Batch downloads', 'No ads'], cta: 'Go Pro', highlight: true },
  { name: 'Team', price: '$29', period: '/month',   desc: 'For agencies and teams',             features: ['Everything in Pro', '5 team seats', 'API access', 'Dedicated support'], cta: 'Start Trial', highlight: false },
];

export default function HomeClient() {
  const [url, setUrl]           = useState('');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<null | 'success'>(null);
  const [format, setFormat]     = useState('MP4 1080p');
  const [copied, setCopied]     = useState(false);
  const [faqOpen, setFaqOpen]   = useState<number | null>(0);

  const handleDownload = () => {
    if (!url.trim()) return;
    setLoading(true); setResult(null);
    setTimeout(() => { setLoading(false); setResult('success'); }, 1800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              grab<span className="text-primary">flow</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            {[['Features', '#features'], ['Pricing', '/pricing'], ['API', '/api'], ['Blog', '/blog']].map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-foreground transition-colors">{label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin" className="hidden sm:flex px-4 py-2 rounded-xl text-sm font-semibold bg-muted hover:bg-muted/80 transition-colors">Sign In</Link>
            <Link href="/signup" className="flex px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm">Get Pro</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            1,000+ platforms · 4K · MP3 · No signup
          </div>
          <h1 className="mb-5">
            Download Any Video<br />
            <span className="bg-gradient-to-r from-primary via-violet-500 to-accent bg-clip-text text-transparent">
              From Any Platform
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Paste a link from YouTube, Instagram, TikTok — instantly grab the video or audio in the quality you want. Fast, free, no tracking.
          </p>

          {/* Download Box */}
          <div className="bg-card border border-border p-2 rounded-2xl max-w-2xl mx-auto shadow-xl shadow-black/5">
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="url"
                  placeholder="Paste video URL from YouTube, TikTok, Instagram…"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground min-w-0"
                />
                {url && (
                  <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
                {url && (
                  <button onClick={() => { setUrl(''); setResult(null); }} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="hidden sm:block bg-muted text-sm font-medium rounded-xl px-3 py-3 outline-none border border-border cursor-pointer"
              >
                {['MP4 1080p', 'MP4 720p', 'MP4 4K', 'MP3 320kbps', 'WAV'].map((f) => <option key={f}>{f}</option>)}
              </select>
              <button
                onClick={handleDownload}
                disabled={loading || !url.trim()}
                className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25 flex-shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="hidden sm:inline">{loading ? 'Fetching…' : 'Download'}</span>
              </button>
            </div>
            {result === 'success' && (
              <div className="mt-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold text-emerald-800">Ready!</span>
                <span className="text-emerald-600 ml-1">Your {format} file is ready to download.</span>
                <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex-shrink-0">
                  <Download className="w-3 h-3" /> Save
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ── */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3">Works Everywhere You Watch</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">From mainstream giants to niche streaming sites.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all text-center">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{p.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-3">Built for Speed. Designed for Privacy.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Priya Mehta',    role: 'Content Creator',       text: 'GrabFlow saves me 2 hours every week. The 4K quality is perfect.',    avatar: 'PM' },
              { name: 'Alex Rodriguez', role: 'Video Editor',           text: 'Finally a downloader with no malware. Clean, fast, reliable.',         avatar: 'AR' },
              { name: 'Seo-yun Park',   role: 'Social Media Manager',   text: 'Batch downloads changed everything. We archive hundreds of clips weekly.', avatar: 'SP' },
            ].map((t) => (
              <div key={t.name} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="mb-3">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-sm mb-6">No hidden fees. Just downloads.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((p) => (
              <div key={p.name} className={`rounded-2xl border p-6 flex flex-col gap-4 transition-all ${
                p.highlight ? 'bg-primary border-primary text-white shadow-2xl scale-[1.02]' : 'bg-card border-border hover:shadow-md'
              }`}>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${p.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>{p.name}</p>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-extrabold">{p.price}</span>
                    <span className={`text-sm mb-1 ${p.highlight ? 'text-white/60' : 'text-muted-foreground'}`}>{p.period}</span>
                  </div>
                  <p className={`text-sm mt-1 ${p.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>{p.desc}</p>
                </div>
                <div className="flex flex-col gap-2.5 flex-1">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? 'bg-white/20' : 'bg-secondary'}`}>
                        <Check className={`w-2.5 h-2.5 ${p.highlight ? 'text-white' : 'text-primary'}`} />
                      </div>
                      <span className={`text-sm ${p.highlight ? 'text-white/90' : 'text-foreground'}`}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/signup"
                  className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all ${
                    p.highlight ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing" className="text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1">
              See full comparison <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2>Common Questions</h2></div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-sm text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent p-12 text-center">
            <h2 className="text-white text-3xl font-extrabold mb-3">Ready to Download Anything?</h2>
            <p className="text-white/70 text-sm max-w-sm mx-auto mb-8">Join 4 million users who trust GrabFlow every day.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className="px-6 py-3 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 shadow-xl flex items-center gap-2">
                <Download className="w-4 h-4" /> Start Downloading Free
              </Link>
              <Link href="/pricing" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 border border-white/20 flex items-center gap-2">
                View Pro Plans <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Download className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-extrabold">grab<span className="text-primary">flow</span></span>
            </Link>
            <p className="text-xs text-muted-foreground">© 2026 GrabFlow. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
