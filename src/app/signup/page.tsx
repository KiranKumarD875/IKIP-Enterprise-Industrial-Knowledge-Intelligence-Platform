"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import BrandPanel from "@/components/layout/brand-panel";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", role: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Signup failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-[45%] xl:w-[50%]">
        <BrandPanel />
      </div>
      
      <div className="w-full lg:w-[55%] xl:w-[50%] bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl mx-auto">
          {/* Logo (Mobile Only) */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Link href="/">
              <Logo iconClassName="w-14 h-14" textClassName="text-3xl text-gray-900" />
            </Link>
          </div>
          
          <div className="text-center mb-10">
          <h1 className="mt-8 text-3xl font-bold text-gray-900">Sign Up</h1>
          <p className="mt-3 text-gray-500 text-base">Get started with IKIP for your plant.</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {error && !error.includes("already exists") && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-base font-medium text-gray-700 mb-2 block">Full Name *</label>
              <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="input-base text-lg py-3" />
            </div>

            <div>
              <label className="text-base font-medium text-gray-700 mb-2 block">Work Email *</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className={cn("input-base text-lg py-3", error.includes("already exists") && "border-red-500 focus:border-red-500 focus:ring-red-500")} />
              {error.includes("already exists") && (
                <div className="mt-2 text-sm text-red-600 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4" /> This email is already registered. <Link href="/login" className="underline hover:text-red-700 ml-1">Log in instead</Link>
                </div>
              )}
            </div>

            <div>
              <label className="text-base font-medium text-gray-700 mb-2 block">Password *</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" className="input-base text-lg py-3 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-base font-medium text-gray-700 mb-2 block">Company</label>
                <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Optional" className="input-base text-lg py-3" />
              </div>
              <div>
                <label className="text-base font-medium text-gray-700 mb-2 block">Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-base text-lg py-3">
                  <option value="">Select role</option>
                  <option>Plant Manager</option>
                  <option>Reliability Engineer</option>
                  <option>Maintenance Engineer</option>
                  <option>Compliance Auditor</option>
                  <option>Quality Engineer</option>
                  <option>Safety Officer</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 mt-4 text-lg">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-base text-gray-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700">Log in</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
