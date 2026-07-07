'use client';
import { useState } from 'react';
import { Code, Key, Zap, Globe, Copy, Check } from 'lucide-react';

const SAMPLE = `curl -X POST https://api.grabflow.app/v1/download \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://youtube.com/watch?v=dQw4w9WgXcQ", "format": "mp4", "quality": "1080p"}'`;

export default function APIPage() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(SAMPLE); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold mb-4">Developer API</span>
          <h1 className="mb-3">GrabFlow API</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">Integrate video downloading into your own apps with our simple REST API.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Zap,   title: 'Fast',   desc: '< 200ms response' },
            { icon: Globe, title: 'Global', desc: '1000+ platforms' },
            { icon: Key,   title: 'Secure', desc: 'API key auth' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-bold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">Quick Example</span>
            </div>
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:bg-secondary transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-xs font-mono text-foreground overflow-x-auto bg-muted rounded-xl p-4 leading-relaxed whitespace-pre-wrap">{SAMPLE}</pre>
        </div>
      </div>
    </div>
  );
}
