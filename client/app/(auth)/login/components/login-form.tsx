import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function LoginForm({
  className, email, password,
  onEmailChange, onPasswordChange, onSubmit,
}: LoginFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full max-w-[620px]", className)}
    >
      <div className="glass-card rounded-3xl px-12 py-14 md:px-16 md:py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground text-center mb-10">
          Welcome back
        </h1>

        <form onSubmit={onSubmit} className="space-y-7">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-medium text-secondary-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="name@example.com" required value={email}
                onChange={(e) => onEmailChange?.(e.target.value)}
                className="h-13 pl-11 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all rounded-xl text-base" />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-sm font-medium text-secondary-foreground">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
               id="password"
                type="password"
                 required 
                 value={password}

                 onChange={(e) => onPasswordChange?.(e.target.value)}
                className="h-13 pl-11 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all rounded-xl text-base" />
            </div>
            <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors mt-1">
              Forgot password?
            </button>
          </div>

          <Button type="submit"
            className="w-full h-13 bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 glow-ring transition-all duration-300 rounded-xl mt-2">
            Log in
          </Button>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary/80 transition-colors font-medium"> Sign up</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
