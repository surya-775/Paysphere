import { useGetMyTransactionQuery } from "@/redux/features/transaction/transaction";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransaction() {
  const { data: myTransaction, isLoading } = useGetMyTransactionQuery(undefined);

  return (
    <div>
      <p className="text-sm font-medium mb-2">Recent transactions</p>
      <div className="overflow-x-auto rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Payment Type</TableHead>
              <TableHead>From Wallet</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(2)
                .fill(0)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell colSpan={3}>
                      <Skeleton className="h-6 w-full rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
            ) : myTransaction && myTransaction?.data.length > 0 ? (
              myTransaction?.data
                .slice(0, myTransaction?.data?.length === 1 ? 1 : 2)
                .map((tx) => (
                  <TableRow key={tx._id} className="hover:bg-muted">
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="truncate">{tx.type}</TableCell>
                    <TableCell className="truncate">{tx?.fromWalletId?.userId?.phone || "Self"}</TableCell>
                    <TableCell className="text-right font-medium">
                      {tx.amount} Tk
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-sm text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
