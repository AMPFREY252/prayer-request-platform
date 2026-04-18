import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { HandHeart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-smooth group-hover:bg-primary/90">
              <HandHeart className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground text-lg tracking-tight">
              Prayer Request Platform
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3">
            <Link to="/submit">
              <Button variant="default" size="sm" data-ocid="nav.submit_button">
                Submit Prayer Request
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="nav.dashboard_link"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" data-ocid="nav.login_link">
                  Admin Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-smooth"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
            <Link to="/submit" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="default"
                className="w-full"
                data-ocid="mobile_nav.submit_button"
              >
                Submit Prayer Request
              </Button>
            </Link>
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full"
                  data-ocid="mobile_nav.dashboard_link"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full"
                  data-ocid="mobile_nav.login_link"
                >
                  Admin Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {year}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-smooth"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
