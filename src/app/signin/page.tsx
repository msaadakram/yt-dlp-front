'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
  const [show, setShow] = useState(false);
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
          <h2 className="text-center mb-1">Welcome back</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">Sign in to your GrabFlow account</p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" placeholder="you@example.com" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted text-sm outline-none focus:border-primary transition-colors pr-10" />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Sign In</button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-5">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
