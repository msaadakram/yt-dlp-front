import { useState } from "react";
import { Link } from "react-router";
import {
  Code2, Copy, Check, Zap, Globe, Lock, BarChart2,
  ChevronDown, ArrowRight, Terminal, Webhook, Key,
  BookOpen, Sparkles, Shield,
} from "lucide-react";
import { Badge, Card, Divider } from "../components/ui";

const CODE_EXAMPLES: Record<string, string> = {
  curl: `curl -X POST https://api.grabflow.io/v1/download \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
    "format": "mp4",
    "quality": "1080p"
  }'`,
  javascript: `import GrabFlow from '@grabflow/sdk';

const client = new GrabFlow({ apiKey: 'YOUR_API_KEY' });

const result = await client.download({
  url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
  format: 'mp4',
  quality: '1080p',
});

console.log(result.downloadUrl); // https://cdn.grabflow.io/...
console.log(result.duration);    // 212 (seconds)
console.log(result.fileSize);    // 248_432_640 (bytes)`,
  python: `import grabflow

client = grabflow.Client(api_key="YOUR_API_KEY")

result = client.download(
    url="https://youtube.com/watch?v=dQw4w9WgXcQ",
    format="mp4",
    quality="1080p",
)

print(result.download_url)  # https://cdn.grabflow.io/...
print(result.duration)      # 212
print(result.file_size)     # 248432640`,
  response: `{
  "id": "dl_01HZXK8N2V3Q4W5Y6Z7A",
  "status": "complete",
  "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
  "title": "Never Gonna Give You Up",
  "author": "Rick Astley",
  "duration": 212,
  "thumbnail": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "format": "mp4",
  "quality": "1080p",
  "fileSize": 248432640,
  "downloadUrl": "https://cdn.grabflow.io/dl_01HZXK8N2V3.mp4",
  "expiresAt": "2024-12-01T12:00:00Z",
  "creditsUsed": 1
}`,
};

const ENDPOINTS = [
  { method: "POST", path: "/v1/download", desc: "Initiate a new download from any supported URL", auth: true },
  { method: "GET",  path: "/v1/download/:id", desc: "Fetch status and result of a download job", auth: true },
  { method: "POST", path: "/v1/batch", desc: "Submit up to 200 URLs in a single batch request", auth: true },
  { method: "GET",  path: "/v1/formats", desc: "List all supported formats and quality options", auth: false },
  { method: "GET",  path: "/v1/platforms", desc: "List all supported platforms with metadata", auth: false },
  { method: "GET",  path: "/v1/usage", desc: "Get your current billing cycle usage stats", auth: true },
  { method: "POST", path: "/v1/webhooks", desc: "Register a webhook for download completion events", auth: true },
  { method: "GET",  path: "/v1/webhooks", desc: "List all registered webhooks for your account", auth: true },
];

const METHOD_COLOR: Record<string, string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
};

const SDKS = [
  { name: "JavaScript / TypeScript", npm: "npm install @grabflow/sdk", badge: "Official", color: "text-yellow-500" },
  { name: "Python", npm: "pip install grabflow", badge: "Official", color: "text-blue-500" },
  { name: "Ruby", npm: "gem install grabflow", badge: "Official", color: "text-red-500" },
  { name: "PHP", npm: "composer require grabflow/grabflow", badge: "Community", color: "text-indigo-500" },
  { name: "Go", npm: "go get github.com/grabflow/grabflow-go", badge: "Community", color: "text-sky-500" },
];

export default function API() {
  const [lang, setLang] = useState<keyof typeof CODE_EXAMPLES>("javascript");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openEndpoint, setOpenEndpoint] = useState<number | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-20 px-4 text-center">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <Badge variant="muted">API & Developers</Badge>
          <h1 className="mt-4 mb-4">
            Build with the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GrabFlow API
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            A clean REST API to integrate video and audio downloading into your app, pipeline, or workflow.
            Designed for developers who value simplicity and reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Key className="w-4 h-4" /> Get API Key Free
            </Link>
            <a
              href="#docs"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card font-semibold text-sm hover:bg-muted transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "< 800ms", label: "Avg. response time" },
            { value: "99.97%", label: "API uptime (30d)" },
            { value: "50M+", label: "API calls / month" },
            { value: "REST", label: "Clean JSON interface" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code playground */}
      <section id="docs" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <Badge variant="muted">Quick Start</Badge>
              <h2 className="mt-3 mb-4">One API call to download anything</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Authenticate with your API key, POST a video URL, and get back a direct download link
                — typically in under a second. No polling loops required.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { icon: Key, title: "Get your API key", desc: "Sign up for free and find your key in the dashboard under Settings → API." },
                  { icon: Terminal, title: "Make your first request", desc: "POST to /v1/download with the video URL and your desired format." },
                  { icon: Zap, title: "Receive the download link", desc: "Get a signed CDN URL back in the response, valid for 24 hours." },
                  { icon: Webhook, title: "Set up webhooks (optional)", desc: "Register a webhook to receive push notifications when batch jobs complete." },
                ].map((s, i) => (
                  <div key={s.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <s.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{i + 1}. {s.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div className="flex flex-col gap-2">
              {/* Language tabs */}
              <div className="flex bg-muted rounded-xl p-1 gap-1">
                {(["javascript", "python", "curl", "response"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
                      lang === l ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l === "response" ? "Response" : l}
                  </button>
                ))}
              </div>

              <div className="relative bg-[#0f0f14] rounded-2xl overflow-hidden border border-border">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Code2 className="w-3 h-3" />
                    <span>{lang === "response" ? "response.json" : `example.${lang === "curl" ? "sh" : lang === "javascript" ? "ts" : "py"}`}</span>
                  </div>
                  <button
                    onClick={() => copy(CODE_EXAMPLES[lang], lang)}
                    className="flex items-center gap-1.5 text-white/40 hover:text-white/80 text-xs transition-colors"
                  >
                    {copiedKey === lang ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedKey === lang ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="p-5 text-xs text-white/80 overflow-x-auto leading-relaxed font-mono">
                  <code>{CODE_EXAMPLES[lang]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="muted">Reference</Badge>
            <h2 className="mt-3">API Endpoints</h2>
          </div>

          <div className="flex flex-col gap-2">
            {ENDPOINTS.map((ep, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  onClick={() => setOpenEndpoint(openEndpoint === i ? null : i)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/40 transition-colors"
                >
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono flex-shrink-0 ${METHOD_COLOR[ep.method]}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm font-mono text-foreground flex-1 min-w-0 truncate">{ep.path}</code>
                  {ep.auth && (
                    <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                      <Lock className="w-3 h-3" /> Auth
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openEndpoint === i ? "rotate-180" : ""}`} />
                </button>
                {openEndpoint === i && (
                  <div className="border-t border-border px-4 py-4">
                    <p className="text-sm text-muted-foreground mb-3">{ep.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {ep.auth && <Badge variant="muted">Requires API Key</Badge>}
                      <Badge variant="new">JSON</Badge>
                      <Badge variant="muted">REST</Badge>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="muted">SDKs</Badge>
            <h2 className="mt-3">Official & Community SDKs</h2>
            <p className="text-muted-foreground text-sm mt-3">
              Get up and running in minutes with your favourite language.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {SDKS.map((sdk) => (
              <Card key={sdk.name} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Code2 className={`w-4 h-4 ${sdk.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm">{sdk.name}</span>
                    <Badge variant={sdk.badge === "Official" ? "pro" : "muted"}>{sdk.badge}</Badge>
                  </div>
                  <code className="text-xs font-mono text-muted-foreground">{sdk.npm}</code>
                </div>
                <button
                  onClick={() => copy(sdk.npm, sdk.name)}
                  className="w-8 h-8 rounded-lg bg-muted hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0"
                >
                  {copiedKey === sdk.name ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="muted">API Features</Badge>
            <h2 className="mt-3">Everything you need, nothing you don't</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Zap,       title: "Sub-second responses",   desc: "Most downloads resolve in under 800ms on average. No polling loops." },
              { icon: Shield,    title: "Signed CDN URLs",        desc: "Download links are signed, expiring tokens — no public exposure of your data." },
              { icon: Globe,     title: "1,000+ platforms",       desc: "All platforms supported in the web UI are accessible through the API." },
              { icon: Webhook,   title: "Webhook events",         desc: "Receive push notifications for download.complete, download.failed events." },
              { icon: BarChart2, title: "Usage dashboard",        desc: "Track calls, credits, and errors in real-time from your developer dashboard." },
              { icon: Sparkles,  title: "Batch endpoint",         desc: "Submit up to 200 URLs in one request for bulk archival and pipelines." },
            ].map((f) => (
              <Card key={f.title} className="p-5 hover:shadow-md transition-shadow">
                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center mb-3">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f0f14] to-[#1a0a2e] p-12 text-center border border-border">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #6c3fff44 0%, transparent 70%)" }} />
            <div className="relative">
              <h2 className="text-white text-3xl font-extrabold mb-3">Start building today</h2>
              <p className="text-white/50 text-sm mb-8 max-w-xs mx-auto">
                Free tier includes 100 API calls/day. No credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                >
                  <Key className="w-4 h-4" /> Get your API key
                </Link>
                <a
                  href="#docs"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors border border-white/10"
                >
                  View Docs <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
