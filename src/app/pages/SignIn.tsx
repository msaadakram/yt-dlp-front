import { useState } from "react";
import { Link } from "react-router";
import {
  Mail, Lock, Eye, EyeOff, Download, ArrowRight,
  Github, Chrome, Sparkles, Check,
} from "lucide-react";
import { Card, Divider, Alert, Spinner } from "../components/ui";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setLoading(false);
      if (email === "error@test.com") setError(true);
      else setSuccess(true);
    }, 1400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative bg-gradient-to-br from-primary via-violet-600 to-accent items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-sm">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <span
              className="text-xl font-extrabold text-white"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              grabflow
            </span>
          </div>

          <h1 className="text-white text-4xl font-extrabold mb-4 leading-tight">
            Welcome back to the fastest downloader.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-10">
            Sign in to unlock unlimited 4K downloads, batch processing, and priority speed — all in one click.
          </p>

          {[
            "Unlimited downloads with no daily cap",
            "4K Ultra HD & lossless WAV audio",
            "Batch download up to 50 URLs at once",
            "Priority server speed — up to 500 MB/s",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-white/80 text-sm">{f}</span>
            </div>
          ))}

          {/* Testimonial */}
          <div className="mt-10 p-5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-white/90 text-sm italic leading-relaxed mb-3">
              "GrabFlow replaced four different tools I was juggling. Everything in one place, always fast."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
                MK
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Marcus Klein</p>
                <p className="text-white/50 text-xs">Video Producer, Berlin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-lg font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              grab<span className="text-primary">flow</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-foreground mb-1">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-semibold">
              <Chrome className="w-4 h-4 text-blue-500" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm font-semibold">
              <Github className="w-4 h-4" />
              Continue with GitHub
            </button>
          </div>

          <Divider label="or sign in with email" />

          {success ? (
            <div className="mt-6">
              <Alert type="success" title="Signed in successfully!">
                Redirecting you to your dashboard…
              </Alert>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              {error && (
                <Alert type="error" title="Invalid credentials">
                  The email or password you entered is incorrect. Please try again.
                </Alert>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Email address
                </label>
                <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-3 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Password
                  </label>
                  <a href="#" className="text-xs text-primary font-semibold hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-3 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                    remember ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {remember && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-sm text-muted-foreground">Keep me signed in for 30 days</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-60 transition-all shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <><Spinner /> Signing in…</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By signing in you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
