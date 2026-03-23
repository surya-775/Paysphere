import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router";

export default function Pricing() {
  const tiers = [
    {
      name: "Personal Wallet",
      price: "Free",
      desc: "For everyday users sending & receiving money.",
      features: [
        "Free wallet account",
        "Send & receive instantly",
        "View transaction history",
        "🎁 50 Tk bonus credited on registration",
      ],
      cta: "Register as User",
    },
    {
      name: "Agent",
      price: "0.5% commission",
      desc: "Earn commission by providing cash-in & cash-out services.",
      features: [
        "Cash-in / Cash-out operations",
        "User verification tools",
        "Real-time commission tracking",
        "🎁 50 Tk bonus credited on registration",
      ],
      cta: "Register as Agent",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Transparent & Fair Pricing
          </h2>
          <p className="text-muted-foreground mt-2">
            No hidden fees. Simple charges and real-time receipts.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`flex flex-col w-full sm:w-[300px] md:w-[350px] rounded-3xl ${
                tier.highlight ? "border-fuchsia-500 shadow-lg" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  {tier.highlight && <Badge variant="default">Popular</Badge>}
                </div>
                <div className="text-3xl font-bold">{tier.price}</div>
                <p className="text-sm text-muted-foreground">{tier.desc}</p>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4" /> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto">
                <Link
                  to={
                    tier.cta === "Register as User"
                      ? "/register/user"
                      : "/register/agent"
                  }
                  className="w-full"
                >
                  <Button
                    variant={tier.highlight ? "default" : "secondary"}
                    className="w-full rounded-2xl border"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
