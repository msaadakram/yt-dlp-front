import { useState } from "react";
import { Link } from "react-router";
import {
  Check, X, Zap, Shield, Globe, HardDrive, Star,
  ArrowRight, ChevronDown, Sparkles,
} from "lucide-react";
import { Badge, Card } from "../components/ui";

const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    desc: "Everything you need to get started",
    badge: null,
    color: "border-border",
    highlight: false,
    features: [
      { text: "720p HD max resolution", ok: true },
      { text: "5 downloads per day", ok: true },
      { text: "MP4 & MP3 formats", ok: true },
      { text: "Standard server speed", ok: true },
      { text: "Watermark-free files", ok: true },
      { text: "Batch downloads", ok: false },
      { text: "4K Ultra HD", ok: false },
      { text: "WAV & FLAC audio", ok: false },
      { text: "API access", ok: false },
      { text: "Priority support", ok: false },
    ],
    cta: "Start Free",
    ctaVariant: "outline" as const,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 9,
    desc: "Unlimited power for creators",
    badge: "Most Popular",
    color: "border-primary",
    highlight: true,
    features: [
      { text: "4K Ultra HD resolution", ok: true },
      { text: "Unlimited downloads", ok: true },
      { text: "All formats (MP4, MP3, WAV, WEBM)", ok: true },
      { text: "Priority server speed", ok: true },
      { text: "Watermark-free files", ok: true },
      { text: "Batch downloads (up to 20)", ok: true },
      { text: "Subtitle download", ok: true },
      { text: "Thumbnail extraction", ok: true },
      { text: "API access", ok: false },
      { text: "Dedicated support", ok: false },
    ],
    cta: "Start 7-day Trial",
    ctaVariant: "primary" as const,
  },
  {
    id: "team",
    name: "Team",
    monthlyPrice: 29,
    desc: "For agencies, studios & power teams",
    badge: null,
    color: "border-border",
    highlight: false,
    features: [
      { text: "Everything in Pro", ok: true },
      { text: "5 team seats included", ok: true },
      { text: "Batch downloads (up to 200)", ok: true },
      { text: "Full API access + webhooks", ok: true },
      { text: "Usage analytics dashboard", ok: true },
      { text: "White-label downloads", ok: true },
      { text: "Dedicated account manager", ok: true },
      { text: "SLA uptime guarantee", ok: true },
      { text: "Custom integrations", ok: true },
      { text: "Priority 24/7 support", ok: true },
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
  },
];

const COMPARE_ROWS = [
  { feature: "Max resolution", free: "720p HD", pro: "4K Ultra HD", team: "4K Ultra HD" },
  { feature: "Daily downloads", free: "5", pro: "Unlimited", team: "Unlimited" },
  { feature: "Formats", free: "MP4, MP3", pro: "All formats", team: "All formats" },
  { feature: "Batch downloads", free: "—", pro: "Up to 20", team: "Up to 200" },
  { feature: "Download speed", free: "Standard", pro: "Priority", team: "Dedicated" },
  { feature: "Subtitle extraction", free: "—", pro: "✓", team: "✓" },
  { feature: "API access", free: "—", pro: "—", team: "✓" },
  { feature: "Team seats", free: "1", pro: "1", team: "5+" },
  { feature: "Support", free: "Community", pro: "Email", team: "Dedicated + SLA" },
  { feature: "Analytics", free: "—", pro: "Basic", team: "Advanced" },
];

const FAQS = [
  { q: "Is the free plan really free forever?", a: "Yes. The free plan has no time limit. You get 5 downloads per day at up to 720p quality at no cost, ever." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual Team plans." },
  { q: "Can I switch plans anytime?", a: "Absolutely. Upgrade or downgrade at any time. Upgrades are prorated immediately; downgrades take effect at the next billing cycle." },
  { q: "Do you offer a free trial for Pro?", a: "Yes — Pro comes with a 7-day free trial. No credit card required to start. Cancel before the trial ends and you won't be charged." },
  { q: "What's the refund policy?", a: "We offer a full refund within 14 days of purchase, no questions asked. Just email support@grabflow.io." },
  { q: "Does Team plan support more than 5 seats?", a: "Yes. Additional seats are $5/mo each. For large organizations (20+), contact our sales team for a custom quote." },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4 text-center">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <Badge variant="muted">Pricing</Badge>
          <h1 className="mt-4 mb-4">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            No hidden fees. No data selling. Pay only for what you use — and cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 bg-muted rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                !annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Annual <Badge variant="new">Save 20%</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => {
            const price = annual && p.monthlyPrice > 0
              ? Math.round(p.monthlyPrice * 0.8)
              : p.monthlyPrice;
            return (
              <div
                key={p.id}
                className={`relative rounded-2xl border-2 p-7 flex flex-col gap-6 transition-all ${
                  p.highlight
                    ? "border-primary bg-gradient-to-b from-secondary to-card shadow-xl shadow-primary/10 scale-[1.02]"
                    : `${p.color} bg-card hover:shadow-md`
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> {p.badge}
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    {p.name}
                  </p>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-5xl font-extrabold text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      ${price}
                    </span>
                    {p.monthlyPrice > 0 && (
                      <span className="text-sm text-muted-foreground mb-2">
                        /{annual ? "mo, billed yearly" : "month"}
                      </span>
                    )}
                    {p.monthlyPrice === 0 && (
                      <span className="text-sm text-muted-foreground mb-2">/forever</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>

                <div className="flex flex-col gap-2.5 flex-1">
                  {p.features.map((f) => (
                    <div key={f.text} className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          f.ok ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {f.ok ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                      </div>
                      <span className={`text-sm ${f.ok ? "text-foreground" : "text-muted-foreground line-through"}`}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={p.id === "team" ? "/signup" : "/signup"}
                  className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                    p.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "border border-border bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {p.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Trust row */}
        <div className="max-w-4xl mx-auto mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          {[
            { icon: Shield, text: "SSL encrypted payments" },
            { icon: Zap, text: "Instant activation" },
            { icon: HardDrive, text: "14-day money-back guarantee" },
            { icon: Globe, text: "Cancel anytime" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="muted">Compare Plans</Badge>
            <h2 className="mt-3">Full Feature Breakdown</h2>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-5 font-semibold text-muted-foreground w-[40%]">Feature</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className={`p-5 font-bold text-center ${p.highlight ? "text-primary" : "text-foreground"}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.feature} className="hover:bg-muted/30 transition-colors">
                      <td className="p-5 font-medium text-foreground">{row.feature}</td>
                      {[row.free, row.pro, row.team].map((val, i) => (
                        <td key={i} className="p-5 text-center">
                          {val === "✓" ? (
                            <div className="inline-flex w-5 h-5 rounded-full bg-emerald-100 items-center justify-center">
                              <Check className="w-3 h-3 text-emerald-600" />
                            </div>
                          ) : val === "—" ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            <span className={`text-xs font-semibold ${i === 1 ? "text-primary" : "text-foreground"}`}>{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="muted">Reviews</Badge>
            <h2 className="mt-3">Loved by 4M+ users</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: "Lena Fischer", role: "Freelance Editor", avatar: "LF", text: "Switched from 3 separate tools to GrabFlow Pro. Saves me 3 hours a week and the 4K quality is indistinguishable from source.", rating: 5, plan: "Pro" },
              { name: "James O'Brien", role: "Podcast Producer", avatar: "JO", text: "The WAV audio downloads are a game changer. Crystal clear, no compression artifacts. Worth every cent of the Pro plan.", rating: 5, plan: "Pro" },
              { name: "Yuki Tanaka", role: "Social Media Lead", avatar: "YT", text: "Team plan is perfect for our agency. We batch download reference clips daily and the API integration with our pipeline is flawless.", rating: 5, plan: "Team" },
            ].map((t) => (
              <Card key={t.name} className="p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2.5 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                  <Badge variant={t.plan === "Pro" ? "pro" : "muted"}>{t.plan}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="muted">FAQ</Badge>
            <h2 className="mt-3">Questions about pricing?</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-sm">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {f.a}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent p-12 text-center">
            <div
              className="absolute inset-0 opacity-15"
              style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 80%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
            <div className="relative">
              <h2 className="text-white text-3xl font-extrabold mb-3">Start downloading for free today</h2>
              <p className="text-white/70 text-sm mb-8 max-w-xs mx-auto">No credit card. No commitment. Just fast, clean downloads.</p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-white/90 transition-colors shadow-xl"
              >
                Create free account <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
