import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

type WalletActionButtonProps = {
  walletId: string;
  status: "active" | "blocked";
  onBlock: (id: string) => Promise<void>;
  onUnblock: (id: string) => Promise<void>;
};

export default function WalletActionButton({
  walletId,
  status,
  onBlock,
  onUnblock,
}: WalletActionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    if (status === "active") {
      await onBlock(walletId);
    } else {
      await onUnblock(walletId);
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className={
            status === "active"
              ? "bg-chart-5 rounded-2xl"
              : "bg-primary rounded-2xl"
          }
          onClick={() => setOpen(true)}
        >
          {status === "active" ? "Block" : "Unblock"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm {status === "active" ? "Block" : "Unblock"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {status === "active" ? "Block" : "Unblock"}{" "}
            this user wallet?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button size="sm" onClick={handleAction}>
              {status === "active" ? "Block" : "Unblock"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
