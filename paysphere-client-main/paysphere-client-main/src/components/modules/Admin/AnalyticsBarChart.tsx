import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllTransactionSummaryQuery } from "@/redux/features/transaction/transaction";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AnalyticsBarChart() {
  const { data: transactionSummary, isLoading } =
    useGetAllTransactionSummaryQuery(undefined);

  const chartData = [
    { name: "Add Money", value: transactionSummary?.data?.totalAddMoney ?? 0 },
    { name: "Fee", value: transactionSummary?.data?.totalFee ?? 0 },
    {
      name: "Send Money",
      value: transactionSummary?.data?.totalSendMoney ?? 0,
    },
    {
      name: "Receive Money",
      value: transactionSummary?.data?.totalReceiveMoney ?? 0,
    },
    { name: "Cash In", value: transactionSummary?.data?.totalCashIn ?? 0 },
    { name: "Cash Out", value: transactionSummary?.data?.totalCashOut ?? 0 },
    { name: "Withdraw", value: transactionSummary?.data?.totalWithdraw ?? 0 },
  ];

  return (
    <Card className="w-full max-w-[650px] mx-auto">
      <CardHeader>
        <CardTitle>All Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-48 w-full min-w-[400px]" />
            <div className="flex justify-between mt-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-3 w-10" />
              ))}
            </div>
          </div>
        ) : (
          // scroll wrapper
          <div className="w-full md:overflow-x-hidden overflow-x-auto">
            <ChartContainer className="h-80 w-[600px]" config={chartConfig}>
              <BarChart data={chartData} margin={{ top: 10 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="value" fill="var(--chart-1)" radius={8} />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
