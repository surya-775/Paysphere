import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, ShieldCheck, Wallet } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import Stat from "@/components/modules/Home/Stat";
import AddMoney from "@/components/modules/User/AddMoney";
import RecentTransaction from "@/components/modules/Transaction/RecentTransaction";
import { Skeleton } from "@/components/ui/skeleton";
import SendMoney from "@/components/modules/User/SendMoney";
import WithdrawMoney from "@/components/modules/User/WithdrawMoney";
import QuickAction from "@/components/modules/Home/QuickAction";
import CashIn from "@/components/modules/Agent/CashIn";
import CashOut from "@/components/modules/Agent/CashOut";
import { useGetMyTransactionAmountQuery } from "@/redux/features/transaction/transaction";

export default function WalletPage() {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const { data: transactionAmount } = useGetMyTransactionAmountQuery(undefined);

  return (
    <div
      className="w-full max-w-2xl mx-auto py-2"
    >
      <div className="relative">
        <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
        <Card className="rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" /> Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-full rounded-lg animate-pulse p-3" />
                  <Skeleton className="h-10 w-full rounded-lg animate-pulse" />
                  <Skeleton className="h-10 w-full rounded-lg animate-pulse" />
                </>
              ) : (
                <>
                  <Stat
                    label="Balance"
                    value={Number((data?.walletId?.balance ?? 0).toFixed(2))}
                  />
                  <Stat label="Last Month Spend" value={Number((transactionAmount?.data.last30Days ?? 0).toFixed(2))} />
                  <Stat label="Rewards" value={0} />
                </>
              )}
            </div>
            <>
              {isLoading ? (
                <div className="grid sm:grid-cols-3 gap-3">
                  <Skeleton className="h-8 w-full rounded-2xl animate-pulse" />
                  <Skeleton className="h-8 w-full rounded-2xl animate-pulse" />
                  <Skeleton className="h-8 w-full rounded-2xl animate-pulse" />
                </div>
              ) : (
                <>
                  {data?.role === "user" && (
                    <div className="grid sm:grid-cols-3 gap-3">
                      <AddMoney />
                      <SendMoney />
                      <WithdrawMoney />
                    </div>
                  )}
                  {data?.role === "agent" && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <CashIn />
                      <CashOut />
                    </div>
                  )}

                  {!data && (
                    <div className="grid sm:grid-cols-3 gap-3">
                      <QuickAction
                        icon={<Send className="h-4 w-4" />}
                        label="Send"
                      />
                      <QuickAction
                        icon={<Wallet className="h-4 w-4" />}
                        label="Deposit"
                      />
                      <QuickAction
                        icon={<ShieldCheck className="h-4 w-4" />}
                        label="Withdraw"
                      />
                    </div>
                  )}
                </>
              )}
            </>
            <RecentTransaction />
          </CardContent>
          <CardFooter className="sr-only">data for illustration.</CardFooter>
        </Card>
      </div>
    </div>
  );
}
