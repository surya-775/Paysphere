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

type ApprovalActionButtonProps = {
  agentId: string;
  isApproved: boolean;
  onApprove: (id: string) => Promise<void>;
  onSuspend: (id: string) => Promise<void>;
};

export default function ApprovalActionButton({
  agentId,
  isApproved,
  onApprove,
  onSuspend,
}: ApprovalActionButtonProps) {
  const [open, setOpen] = useState(false);

  const handleAction = async () => {
    if (isApproved) {
      await onSuspend(agentId);
    } else {
      await onApprove(agentId);
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className={
            isApproved
              ? "bg-chart-5 rounded-2xl"
              : "bg-primary rounded-2xl"
          }
          onClick={() => setOpen(true)}
        >
          {isApproved ? "Suspend" : "Approve"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm {isApproved ? "Suspend" : "Approve"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {isApproved ? "suspend" : "approve"} this
            agent?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button size="sm" onClick={handleAction}>
              {isApproved ? "Suspend" : "Approve"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
