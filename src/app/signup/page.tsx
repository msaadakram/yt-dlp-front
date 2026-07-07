'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Download, Check } from 'lucide-react';

export default function SignUpPage() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold">grab<span className="text-primary">flow</span></span>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-center mb-1">Create your account</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">Start downloading for free today</p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">First name</label>
                <input type="text" placeholder="John" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Last name</label>
                <input type="text" placeholder="Doe" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input type="password" placeholder="Min. 8 characters" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <button type="button" onClick={() => setAgreed(!agreed)} className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${agreed ? 'bg-primary border-primary' : 'border-border bg-muted'}`}>
                {agreed && <Check className="w-2.5 h-2.5 text-white" />}
              </button>
              <span className="text-xs text-muted-foreground">
                I agree to the{' '}
                <Link href="/" className="text-primary hover:underline">Terms of Service</Link>{' '}and{' '}
                <Link href="/" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 mt-1">Create Account</button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
