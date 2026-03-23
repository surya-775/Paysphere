import { lazy, Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
const WalletPage = lazy(() => import('@/pages/WalletPage'));

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-200/50 via-white to-transparent dark:from-fuchsia-900/20" />
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="rounded-full">Secure • Fast • Reliable</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              Your all‑in‑one{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                digital wallet
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Send, spend, and manage money with confidence. Powerful features
              for Users, Agents, and Admins built with modern tech.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#features">
                <Button size="lg" className="rounded-2xl">
                  Explore features
                </Button>
              </a>
            </div>
            <div className="flex items-center lg:gap-6  gap-2 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Bank‑grade security
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Instant transfers
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> 50k+ users
              </div>
            </div>
          </motion.div>
          <Suspense fallback={<div className="h-64 w-full bg-muted animate-pulse rounded-3xl" />}>
            <WalletPage />
          </Suspense>
        </div>
      </div>
    </section>
  );
}