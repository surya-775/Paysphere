/* eslint-disable @typescript-eslint/no-explicit-any */
import { Wallet } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import z from "zod";
import { useForm } from "react-hook-form";
import { useAddMoneyMutation } from "@/redux/features/wallet/wallet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
  amount: z.coerce
    .number({ error: "Please enter at least 10 TK" })
    .min(10, "You must enter at least 10 TK"),
});

type TFormValues = z.infer<typeof formSchema>;

export default function AddMoney() {
  const [open, setOpen] = useState(false);
  const [addMoney] = useAddMoneyMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 0 },
  });

  const onSubmit = async (data: TFormValues) => {
    const toastId = toast.loading("Adding money...");

    try {
      await addMoney({ amount: data.amount }).unwrap();
      toast.success("Money added successfully!", { id: toastId });
      form.reset({ amount: 0 });
      setOpen(false);
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
          <Wallet className="h-4 w-4" />
          Add Money
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-[425px]"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Money</DialogTitle>
              <DialogDescription>
                Enter the amount you want to deposit in your wallet
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter deposit amount"
                      {...field}
                      min={10}
                      value={field.value as number}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Minimum 1 unit required to deposit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Money</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
