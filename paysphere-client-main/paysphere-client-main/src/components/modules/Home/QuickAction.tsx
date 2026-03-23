import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      asChild
      variant="secondary"
      className="rounded-2xl justify-start gap-2"
    >
      <Link to="/login">
        {icon}
        {label}
      </Link>
    </Button>
  );
}
