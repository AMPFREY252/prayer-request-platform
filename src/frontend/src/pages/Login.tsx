import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, HandHeart, Lock, LogIn, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { PublicLayout } from "../layouts/PublicLayout";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempted(true);
    setLoginError(null);
    setIsSubmitting(true);

    // small delay for UX feedback
    await new Promise((r) => setTimeout(r, 300));

    const success = login(username, password);
    if (!success) {
      setLoginError("Invalid username or password. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <PublicLayout>
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo + heading */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <HandHeart className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-foreground tracking-tight">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-base mt-2 leading-relaxed">
              Sign in to manage prayer requests
            </p>
          </div>

          {/* Card */}
          <div
            className="bg-card rounded-2xl shadow-card border border-border p-7"
            data-ocid="login.card"
          >
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                    data-ocid="login.username.input"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.28 }}
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    data-ocid="login.password.input"
                  />
                </div>
              </motion.div>

              {/* Error state — only after a login attempt */}
              {loginAttempted && loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Alert variant="destructive" data-ocid="login.error_state">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <div className="border-t border-border pt-2" />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gap-2.5 h-12 text-base font-semibold"
                size="lg"
                disabled={isSubmitting}
                data-ocid="login.submit_button"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
