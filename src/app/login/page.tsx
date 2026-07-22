"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import BrandPanel from "@/components/layout/brand-panel";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed.");
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
          <h1 className="mt-8 text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-3 text-gray-500 text-base">Log in to your IKIP account</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-base font-medium text-gray-700 mb-2 block">Email</label>
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-base text-lg py-3" />
            </div>

            <div>
              <label className="text-base font-medium text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <input required type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" className="input-base text-lg py-3 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 mt-4 text-lg">
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in...</>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="text-center text-base text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700">Sign Up</Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
