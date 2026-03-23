import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllTransactionQuery } from "@/redux/features/transaction/transaction";
import { format } from "date-fns";
import PaginationComponent from "@/components/modules/HelperComponents/PaginationComponent";
import type { IActiveFilters } from "../TransactionPage";
import TransactionFilters from "@/components/modules/HelperComponents/TransactionFilters";
import type { DateRange } from "react-day-picker";
import SkeletonTableLoading from "@/components/modules/HelperComponents/SkeletonTableLoading";

export default function AllTransactionPage() {
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>({
    type: "all",
  });
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: transactionData, isLoading } = useGetAllTransactionQuery({
    page,
    limit,
    type: activeFilters.type === "all" ? undefined : activeFilters.type,
    startDate: activeFilters.startDate,
    endDate: activeFilters.endDate,
  });

  const transactions = transactionData?.data || [];
  const meta = transactionData?.meta;

  const handleFiltersApply = ({
    type,
    dateRange,
  }: {
    type: string;
    dateRange?: DateRange;
  }) => {
    setPage(1);
    setActiveFilters({
      type: type,
      startDate: dateRange?.from
        ? format(dateRange.from, "yyyy-MM-dd")
        : undefined,
      endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
    });
  };

  const handleFiltersReset = () => {
    setPage(1);
    setActiveFilters({ type: "all" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      <Card>
        <CardHeader>
          <CardTitle>All Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <TransactionFilters
            userInfo={undefined}
            onApply={handleFiltersApply}
            onReset={handleFiltersReset}
          />

          {/* Table */}
          <Table className="border-y">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance After</TableHead>
                <TableHead>From Wallet</TableHead>
                <TableHead>To Wallet</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton Rows
                <SkeletonTableLoading />
              ) : transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>
                      {format(new Date(tx.createdAt), "PP, hh:mm a")}
                    </TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.amount.toFixed(2)}</TableCell>
                    <TableCell>{tx.currentBalance.toFixed(2)}</TableCell>
                    <TableCell>
                      {tx?.fromWalletId?.userId?.phone || "Self"}
                    </TableCell>
                    <TableCell>{tx?.toWalletId?.userId?.phone}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {!isLoading && meta && meta.totalPage > 1 && (
            <PaginationComponent
              currentPage={page}
              totalPages={meta.totalPage}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
