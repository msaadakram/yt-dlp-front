import { useState, createContext, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Download, Moon, Sun, Menu, X, ChevronRight,
  Twitter, Youtube, Instagram,
} from "lucide-react";

// ─── Theme context ────────────────────────────────────────────────────────────

const DarkCtx = createContext<{ dark: boolean; setDark: (v: boolean) => void }>({
  dark: false,
  setDark: () => {},
});

export function useDark() {
  return useContext(DarkCtx);
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Features", to: "/" },
  { label: "Platforms", to: "/" },
  { label: "Pricing", to: "/pricing" },
  { label: "API", to: "/api" },
  { label: "Blog", to: "/blog" },
];

function Nav({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Download className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-extrabold tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            grab<span className="text-primary">flow</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`hover:text-foreground transition-colors ${
                pathname === l.to && l.to !== "/" ? "text-primary font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/signin"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-muted hover:bg-muted/80 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
          >
            Get Pro
          </Link>
          <button
            className="md:hidden w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            <Link
              to="/signin"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold bg-muted text-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Download className="w-3.5 h-3.5 text-white" />
              </div>
              <span
                className="font-extrabold"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                grab<span className="text-primary">flow</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fast, private, and free video downloads from any platform.
            </p>
          </div>
          {[
            { title: "Product", links: [{ label: "Features", to: "/" }, { label: "Pricing", to: "/pricing" }, { label: "API", to: "/api" }, { label: "Blog", to: "/blog" }, { label: "Status", to: "/" }] },
            { title: "Platforms", links: [{ label: "YouTube", to: "/" }, { label: "Instagram", to: "/" }, { label: "TikTok", to: "/" }, { label: "Facebook", to: "/" }, { label: "Twitter/X", to: "/" }] },
            { title: "Company", links: [{ label: "About", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Privacy", to: "/" }, { label: "Terms", to: "/" }, { label: "Contact", to: "/" }] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-3">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-border mb-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2024 GrabFlow. All rights reserved.</p>
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
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function Root() {
  const [dark, setDark] = useState(false);
  return (
    <DarkCtx.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark" : ""}>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <Nav dark={dark} setDark={setDark} />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </DarkCtx.Provider>
  );
}
