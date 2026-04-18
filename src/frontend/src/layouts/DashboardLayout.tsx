import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import { HandHeart, Inbox, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    to: "/dashboard",
    label: "All Requests",
    icon: LayoutDashboard,
    ocid: "sidebar.all_requests",
  },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <HandHeart className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-sidebar-foreground text-base tracking-tight">
          Prayer Platform
        </span>
      </div>

      <Separator className="bg-sidebar-border mx-3 w-auto" />

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, ocid }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              data-ocid={ocid}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-xs"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-sidebar-border mx-3 w-auto" />

      {/* Logout */}
      <div className="px-3 py-4 space-y-3">
        <button
          type="button"
          onClick={() => logout()}
          data-ocid="sidebar.logout_button"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth w-full text-left"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
        <p className="text-center text-xs text-sidebar-foreground/30 pb-1">
          © {year}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sidebar-foreground/50 transition-smooth"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col flex-shrink-0 fixed inset-y-0 left-0 z-30">
        <SidebarNav />
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-20 bg-card border-b border-border h-14 flex items-center px-4 gap-3">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0"
                aria-label="Open menu"
                data-ocid="mobile.menu_toggle"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-64 bg-sidebar border-sidebar-border"
            >
              <SidebarNav onNavigate={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground text-sm">
              Prayer Platform
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
