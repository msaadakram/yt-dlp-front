import { useState } from "react";
import { Link } from "react-router";
import {
  Mail, Lock, Eye, EyeOff, User, Download, ArrowRight,
  Github, Chrome, Check, Star, Sparkles, Shield,
} from "lucide-react";
import { Divider, Alert, Spinner } from "../components/ui";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [plan, setPlan] = useState<"free" | "pro">("free");

  const strength = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"][strength];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-[#0f0f14] via-[#1a1030] to-[#0c1020] items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 40%, #6c3fff55 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, #ff4f8b44 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-sm w-full">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              grab<span className="text-primary">flow</span>
            </span>
          </div>

          {/* Plan switcher on left */}
          <h2 className="text-white text-3xl font-extrabold mb-3 leading-tight">
            Choose your plan to get started
          </h2>
          <p className="text-white/50 text-sm mb-8">You can always upgrade later. No credit card required for Free.</p>

          {/* Plan cards */}
          {[
            {
              id: "free" as const,
              name: "Free",
              price: "$0",
              desc: "5 downloads/day · 720p · MP4 & MP3",
              badge: null,
            },
            {
              id: "pro" as const,
              name: "Pro",
              price: "$9/mo",
              desc: "Unlimited · 4K · All formats · Priority speed",
              badge: "Most Popular",
            },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPlan(p.id)}
              className={`w-full text-left p-4 rounded-2xl border mb-3 transition-all ${
                plan === p.id
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{p.name}</span>
                  {p.badge && (
                    <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full">
                      {p.badge}
                    </span>
                  )}
                </div>
                <span className="text-white font-extrabold text-sm">{p.price}</span>
              </div>
              <p className="text-white/50 text-xs">{p.desc}</p>
              {plan === p.id && (
                <div className="flex items-center gap-1 mt-2 text-primary text-xs font-semibold">
                  <Check className="w-3 h-3" /> Selected
                </div>
              )}
            </button>
          ))}

          {/* Trust signals */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: Shield, text: "SSL-encrypted, zero data stored" },
              { icon: Star, text: "4.9/5 from 12,000+ reviews" },
              { icon: Sparkles, text: "No credit card required to start" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-white/50 text-xs">
                <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              grab<span className="text-primary">flow</span>
            </span>
          </div>

          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-extrabold mb-2">Account created!</h2>
              <p className="text-muted-foreground text-sm mb-6">
                Welcome to GrabFlow. Check your email to verify your account.
              </p>
              <Link
                to="/signin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Sign in now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-foreground mb-1">Create your free account</h2>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-semibold">
                  <Chrome className="w-4 h-4 text-blue-500" />
                  Sign up with Google
                </button>
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-semibold">
                  <Github className="w-4 h-4" />
                  Sign up with GitHub
                </button>
              </div>

              <Divider label="or create with email" />

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full name</label>
                  <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-3 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email address</label>
                  <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-3 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Password</label>
                  <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-3 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="text-muted-foreground hover:text-foreground">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {password && (
                    <div className="mt-1">
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              i <= strength ? strengthColor : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {PASSWORD_RULES.map((r) => (
                          <div key={r.label} className={`flex items-center gap-1 text-[10px] ${r.test(password) ? "text-emerald-600" : "text-muted-foreground"}`}>
                            <Check className="w-2.5 h-2.5" />
                            {r.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Agree */}
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setAgree(!agree)}
                    className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 ${
                      agree ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {agree && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I agree to GrabFlow's{" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading || !agree}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60 transition-all shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <><Spinner /> Creating account…</>
                  ) : (
                    <>Create {plan === "pro" ? "Pro" : "Free"} Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
