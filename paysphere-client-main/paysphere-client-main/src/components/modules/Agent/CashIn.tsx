/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send } from "lucide-react";
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
import { useGetAllUserQuery } from "@/redux/features/user/user";
import SearchPhone from "@/components/SearchPhone";
import { useCashInMutation } from "@/redux/features/wallet/wallet";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const sendMoneySchema = z.object({
  walletId: z.string().min(1, "Phone number is required"),
  amount: z
    .number({ error: "Amount is required" })
    .min(10, "Amount must be at least 10"),
});

type TFormValues = z.infer<typeof sendMoneySchema>;

export default function CashIn() {
  const [open, setOpen] = useState(false);

  const { data: usersData } = useGetAllUserQuery({
    fields: "phone,walletId",
  });
  const { data: myInfo } = useUserInfoQuery();

  const [cashIn] = useCashInMutation();

  const users = usersData?.data
    .filter((item: { phone: string }) => item.phone !== myInfo?.phone)
    .map((item: any) => ({
      phone: item.phone,
      walletId: item.walletId._id,
    }));

  const form = useForm<TFormValues>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      walletId: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: TFormValues) => {
    const cashInData = {
      ...data,
      amount: Number(data.amount),
    };

    const toastId = toast.loading("CashIn money...");

    try {
      await cashIn(cashInData).unwrap();
      toast.success("CashIn successfully!", { id: toastId });
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
          <Send className="h-4 w-4" />
          Cash In
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>CashIn Money</DialogTitle>
              <DialogDescription>
                Enter user phone number & amount to cash In money.
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
                    <SearchPhone field={field} users={users || []} />
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
              <Button type="submit">Cash In</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
