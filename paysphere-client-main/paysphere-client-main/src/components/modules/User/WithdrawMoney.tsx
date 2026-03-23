/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import SearchPhone from "@/components/SearchPhone";
import { useWithdrawMoneyMutation } from "@/redux/features/wallet/wallet";
import { useGetAllAgentQuery } from "@/redux/features/agent/agent";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const withdrawMoneySchema = z.object({
  walletId: z.string().min(1, "Phone number is required"),
  amount: z
    .number({ error: "Amount is required" })
    .min(10, "Amount must be at least 10"),
});

type TFormValues = z.infer<typeof withdrawMoneySchema>;

export default function WithdrawMoney() {
  const [open, setOpen] = useState(false);

  const { data: agentData } = useGetAllAgentQuery({
    fields: "phone,walletId",
  });

  const [withdrawMoney] = useWithdrawMoneyMutation();
  const { data: myInfo } = useUserInfoQuery();

  const agents = agentData?.data
    .filter((item: { phone: string }) => item.phone !== myInfo?.phone)
    .map((item: any) => ({
      phone: item.phone,
      walletId: item.walletId._id,
    }));

  const form = useForm<TFormValues>({
    resolver: zodResolver(withdrawMoneySchema),
    defaultValues: {
      walletId: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: TFormValues) => {
    const withdrawData = {
      ...data,
      amount: Number(data.amount),
    };

    const toastId = toast.loading("Withdraw money...");

    try {
      await withdrawMoney(withdrawData).unwrap();
      toast.success("Withdraw money successfully!", { id: toastId });
      setOpen(false);
      form.reset({ walletId: "", amount: 0 });
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-2xl justify-start gap-2 w-full"
        >
          <ShieldCheck className="h-4 w-4" />
          Withdraw Money
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Withdraw Money</DialogTitle>
              <DialogDescription>
                Enter agent phone number & amount to withdraw money.
              </DialogDescription>
            </DialogHeader>

            {/* Phone number search field */}
            <FormField
              control={form.control}
              name="walletId"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <SearchPhone field={field} users={agents || []} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount input */}
            <FormField
              control={form.control}
              name="amount"
              rules={{
                required: "Amount is required",
                min: { value: 10, message: "Amount must be at least 10" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      min={10}
                      value={field.value as number}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Withdraw</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
