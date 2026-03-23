import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Send, ShieldCheck, Users, Wallet, Zap } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Bank-grade security",
      desc: "Your money and data are protected with encryption and real-time fraud detection.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant transactions",
      desc: "Transfer funds within seconds — anytime, anywhere in the world.",
    },
    {
      icon: <Send className="h-5 w-5" />,
      title: "Global payments",
      desc: "Send and receive money across borders with minimal effort.",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Smart insights",
      desc: "Track spending, set budgets, and view clear analytics of your activity.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "For everyone",
      desc: "Built for individuals, businesses, and agents with role-based dashboards.",
    },
    {
      icon: <Wallet className="h-5 w-5" />,
      title: "Low & transparent fees",
      desc: "No hidden charges — just simple, affordable pricing for every transfer.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Features that matter
          </h2>
          <p className="text-muted-foreground mt-2">
            Everything you need for a secure and effortless digital wallet experience.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <Card key={f.title} className="rounded-3xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {f.icon}
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {f.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
