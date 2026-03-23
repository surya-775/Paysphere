import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { role } from "@/constants/role";


interface TransactionFiltersProps {
  userInfo: { role: string } | undefined;
  onApply: (filters: { type: string; dateRange?: DateRange }) => void;
  onReset: () => void;
}

export default function TransactionFilters({
  userInfo,
  onApply,
  onReset,
}: TransactionFiltersProps) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);

  const filterOptions = useMemo(() => {
    if (!userInfo) {
      return (
        <>
          <SelectItem value="fee">Fee</SelectItem>
          <SelectItem value="add_money">Add Money</SelectItem>
          <SelectItem value="withdraw">Withdraw</SelectItem>
          <SelectItem value="send_money">Send Money</SelectItem>
          <SelectItem value="cash_in">Cash In</SelectItem>
          <SelectItem value="cash_out">Cash Out</SelectItem>
          <SelectItem value="receive_money">Receive Money</SelectItem>
        </>
      );
    }
    switch (userInfo.role) {
      case role.user:
        return (
          <>
            <SelectItem value="add_money">Add Money</SelectItem>
            <SelectItem value="withdraw">Withdraw</SelectItem>
            <SelectItem value="send_money">Send Money</SelectItem>
            <SelectItem value="cash_in">Cash In</SelectItem>
            <SelectItem value="receive_money">Receive Money</SelectItem>
          </>
        );
      case role.agent:
        return (
          <>
            <SelectItem value="withdraw">Withdraw</SelectItem>
            <SelectItem value="send_money">Send Money</SelectItem>
            <SelectItem value="cash_in">Cash In</SelectItem>
            <SelectItem value="cash_out">Cash Out</SelectItem>
          </>
        );
      case role.admin:
        return (
          <>
            <SelectItem value="fee">Fee</SelectItem>
            <SelectItem value="send_money">Send Money</SelectItem>
            <SelectItem value="add_money">Add money</SelectItem>
          </>
        );
      default:
        return null;
    }
  }, [userInfo]);

  const handleApplyClick = () => {
    onApply({ type: selectedType, dateRange: selectedDateRange });
  };

  const handleResetClick = () => {
    setSelectedType("all");
    setSelectedDateRange(undefined);
    onReset();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="md:w-[180px] w-full">
          <SelectValue placeholder="Filter by Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {filterOptions}
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "md:w-[300px] w-full justify-start text-left font-normal",
              !selectedDateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDateRange?.from ? (
              selectedDateRange.to ? (
                <>
                  {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                  {format(selectedDateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={selectedDateRange}
            onSelect={setSelectedDateRange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Button onClick={handleApplyClick}>Apply Filters</Button>
      <Button onClick={handleResetClick} className="bg-chart-5">
        Reset
      </Button>
    </div>
  );
}
