import { Card, CardContent } from "@/components/ui/card";

export default function StatsStrip() {
  const stats = [
    { label: "Monthly volume", value: "$2.3M" },
    { label: "Transactions/day", value: "18k" },
    { label: "Avg. uptime", value: "99.98%" },
    { label: "Countries", value: "3+" },
  ];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="rounded-3xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
