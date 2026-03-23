import { Card, CardTitle, CardContent } from "@/components/ui/card";
import {
  IconWallet,
  IconUsers,
  IconUserDollar,
  IconArrowsExchange,
} from "@tabler/icons-react";
import CountUp from "react-countup";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardStatsQuery } from "@/redux/features/transaction/transaction";

export default function DashboardStatsCard() {
  const { data: statsData, isLoading } = useGetDashboardStatsQuery(undefined);

  const stats = [
    {
      title: "Wallet Balance",
      value: statsData?.data?.walletBalance ?? 0,
      suffix: " Tk",
      icon: <IconWallet className="h-8 w-8 text-primary" />,
      description: "Your current wallet balance",
      bg: "bg-primary/20",
    },
    {
      title: "Total Users",
      value: statsData?.data?.totalUsers ?? 0,
      icon: <IconUsers className="h-8 w-8 text-muted-foreground" />,
      description: "Registered users in the system",
      bg: "bg-secondary/20",
    },
    {
      title: "Total Agents",
      value: statsData?.data?.totalAgents ?? 0,
      icon: <IconUserDollar className="h-8 w-8 text-muted-foreground" />,
      description: "Registered agent in the system",
      bg: "bg-accent/20",
    },
    {
      title: "Total Transactions",
      value: statsData?.data?.totalTransactions ?? 0,
      icon: <IconArrowsExchange className="h-8 w-8 text-destructive" />,
      description: "Overall processed transactions",
      bg: "bg-destructive/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((item, i) => (
        <Card
          key={i}
          className="shadow-sm hover:shadow-md transition-shadow duration-300 border-border"
        >
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex justify-between items-center gap-3">
                <div className={`p-1 rounded-lg ${item.bg}`}>{item.icon}</div>
                <CardTitle className="text-2xl font-bold">
                  {isLoading ? (
                    <Skeleton className="h-8 w-24 rounded-md" />
                  ) : (
                    <CountUp
                      start={0}
                      end={item.value}
                      duration={2.5}
                      separator=","
                      decimals={
                        typeof item.value === "number" && item.value % 1 !== 0
                          ? 2
                          : 0
                      }
                      suffix={item.suffix || ""}
                      useEasing={true}
                    />
                  )}
                </CardTitle>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-5">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
