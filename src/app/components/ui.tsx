import { useState } from "react";
import { Info, Check, AlertCircle, X, Loader2 } from "lucide-react";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "pro" | "hot" | "new" | "success" | "muted";
}) {
  const styles = {
    default: "bg-secondary text-secondary-foreground",
    pro: "bg-purple-100 text-purple-700",
    hot: "bg-rose-100 text-rose-600",
    new: "bg-emerald-100 text-emerald-700",
    success: "bg-green-100 text-green-700",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card rounded-2xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Avatar({
  initials,
  size = "md",
  color = "bg-primary",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-12 h-12 text-base",
  };
  return (
    <div
      className={`${sizes[size]} ${color} text-primary-foreground rounded-full flex items-center justify-center font-bold select-none flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px bg-border" />
      {label && <span className="text-xs text-muted-foreground font-medium">{label}</span>}
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${
        checked ? "bg-primary" : "bg-switch-background"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function Spinner() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

export function Alert({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "success" | "warning" | "error";
  title: string;
  children: React.ReactNode;
}) {
  const cfg = {
    info: { bg: "bg-blue-50 border-blue-200", icon: Info, iconColor: "text-blue-500" },
    success: { bg: "bg-emerald-50 border-emerald-200", icon: Check, iconColor: "text-emerald-500" },
    warning: { bg: "bg-amber-50 border-amber-200", icon: AlertCircle, iconColor: "text-amber-500" },
    error: { bg: "bg-red-50 border-red-200", icon: X, iconColor: "text-red-500" },
  }[type];
  const Icon = cfg.icon;
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${cfg.bg}`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.iconColor}`} />
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{children}</p>
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  color = "bg-primary",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-foreground text-background text-xs rounded-lg whitespace-nowrap shadow-lg z-50">
          {label}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
        </div>
      )}
    </div>
  );
}

export function Input({
  label,
  icon: Icon,
  ...props
}: {
  label?: string;
  icon?: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 bg-input-background rounded-xl px-3 py-2.5 border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {Icon && <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
        <input
          {...props}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-0"
        />
      </div>
    </div>
  );
}
