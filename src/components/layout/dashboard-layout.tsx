"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, FileText, MessageSquare, User, LogOut, Menu, X, Activity, ShieldCheck, Network, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Assume this might exist, or I can just use native title or a simple span for now. I'll stick to basic native titles for simplicity and robust integration without assuming too many UI libs.

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "AI Copilot", href: "/dashboard/queries" },
  { icon: FileText, label: "Documents", href: "/dashboard/documents" },
  { icon: Activity, label: "Failure Analysis", href: "/dashboard/rca" },
  { icon: ShieldCheck, label: "Compliance Audit", href: "/dashboard/compliance" },
  { icon: Network, label: "Knowledge Graph", href: "/dashboard/graph" },
  { icon: Cpu, label: "Digital Twins", href: "/dashboard/assets" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // New state for desktop collapse

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/login"));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-ink-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-xs text-ink-400 font-medium tracking-wide">Loading your workspace…</p>
        </div>
      </div>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-ink-50 flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-ink-100 fixed inset-y-0 z-30 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-24" : "w-80"
        )}
      >
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group inline-block transition-transform duration-300 origin-left">
              <Logo showText={!isCollapsed} className="scale-105 group-hover:scale-110" iconClassName="w-8 h-8" textClassName="text-xl text-ink-900" />
            </Link>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-colors hidden lg:block flex-shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={isCollapsed ? link.label : undefined}
                className={cn(
                  "relative flex items-center rounded-xl font-medium transition-all duration-200",
                  isCollapsed ? "justify-center p-3" : "gap-4 px-5 py-3 text-lg",
                  isActive
                    ? "bg-gradient-to-r from-indigo-50 to-indigo-50/40 text-indigo-700 shadow-inset"
                    : "text-ink-600 hover:text-ink-900 hover:bg-ink-100/70"
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-indigo-600" />
                )}
                <Icon className={cn("shrink-0 transition-all", isCollapsed ? "w-7 h-7" : "w-6 h-6", isActive && "text-indigo-600")} />
                {!isCollapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ink-100">
          <div className={cn("flex items-center mb-2 rounded-xl transition-all duration-300", isCollapsed ? "justify-center" : "gap-3 px-3 py-3")}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-base font-bold text-white shadow-glow shrink-0">
              {initials}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-ink-900 truncate">{user.name}</p>
                <p className="text-base text-ink-400 truncate">{user.email}</p>
              </div>
            )}
          </div>
          <button 
            onClick={handleLogout} 
            title={isCollapsed ? "Log out" : undefined}
            className={cn(
              "flex items-center rounded-xl font-medium text-ink-500 hover:text-red-600 hover:bg-red-50 w-full transition-colors",
              isCollapsed ? "justify-center p-3" : "gap-4 px-5 py-3 text-lg"
            )}
          >
            <LogOut className={cn("shrink-0", isCollapsed ? "w-6 h-6" : "w-6 h-6")} />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 glass border-b border-ink-100 z-50 px-4 py-3 flex items-center justify-between shadow-subtle">
        <Link href="/">
          <Logo iconClassName="w-8 h-8" textClassName="text-xl text-ink-900" />
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-ink-600 hover:bg-ink-100">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm animate-fade-in" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-ink-100 p-4 pt-16 flex flex-col shadow-floating animate-scale-in origin-top-left">
            <nav className="flex-1 space-y-1">
              {SIDEBAR_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium transition-colors",
                      isActive ? "bg-indigo-50 text-indigo-700" : "text-ink-600 hover:bg-ink-100/70"
                    )}
                  >
                    <Icon className="w-6 h-6" /> {link.label}
                  </Link>
                );
              })}
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-4 px-5 py-3 rounded-xl text-lg font-medium text-ink-500 hover:text-red-600 hover:bg-red-50 w-full">
              <LogOut className="w-6 h-6" /> Log out
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 pt-16 lg:pt-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-24" : "lg:ml-80"
        )}
      >
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
