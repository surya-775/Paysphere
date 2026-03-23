import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import LoginForm from "@/components/modules/Authentication/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20 px-4 relative">
      <div className="absolute top-4 left-6">
        <Logo />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-96"
      >
        <Card className="rounded-2xl shadow-xl border border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Welcome Back 👋
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Login to continue your journey
            </p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
