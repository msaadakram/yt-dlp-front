'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';

const PLANS = [
  { name: 'Free',  price: '$0',  period: '/forever', desc: 'Perfect for occasional downloads', features: ['720p max resolution', '5 downloads/day', 'MP4 & MP3 only', 'Standard speed', 'Watermark-free'],                                              cta: 'Start Free',   highlight: false, badge: null },
  { name: 'Pro',   price: '$9',  period: '/month',   desc: 'For power users and creators',      features: ['4K Ultra HD', 'Unlimited downloads', 'All formats', 'Priority speed', 'Batch downloads', 'No ads'],                                           cta: 'Go Pro',       highlight: true,  badge: 'Most Popular' },
  { name: 'Team',  price: '$29', period: '/month',   desc: 'For agencies and teams',             features: ['Everything in Pro', '5 team seats', 'API access', 'Dedicated support', 'Custom integrations', 'White-label'],                                cta: 'Start Trial',  highlight: false, badge: null },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="min-h-screen bg-background pt-20 px-4 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="mb-3">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-sm mb-6">No hidden fees. No data selling. Just downloads.</p>
          <div className="inline-flex items-center gap-1 bg-muted rounded-xl p-1">
            <button onClick={() => setAnnual(false)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>Monthly</button>
            <button onClick={() => setAnnual(true)}  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              Annual <span className="px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">-20%</span>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-6 flex flex-col gap-5 transition-all ${
              p.highlight ? 'bg-primary border-primary text-white shadow-2xl scale-[1.02]' : 'bg-card border-border hover:shadow-md'
            }`}>
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-md">{p.badge}</span>
                </div>
              )}
              <div>
                <p className={`text-sm font-bold uppercase tracking-wider ${p.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>{p.name}</p>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-4xl font-extrabold">
                    {annual && p.price !== '$0' ? `$${Math.round(parseInt(p.price.slice(1)) * 0.8)}` : p.price}
                  </span>
                  <span className={`text-sm mb-1 ${p.highlight ? 'text-white/60' : 'text-muted-foreground'}`}>{p.period}</span>
                </div>
                <p className={`text-sm mt-1 ${p.highlight ? 'text-white/70' : 'text-muted-foreground'}`}>{p.desc}</p>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? 'bg-white/20' : 'bg-secondary'}`}>
                      <Check className={`w-2.5 h-2.5 ${p.highlight ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <span className={`text-sm ${p.highlight ? 'text-white/90' : 'text-foreground'}`}>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition-all ${
                p.highlight ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-white hover:bg-primary/90'
              }`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
