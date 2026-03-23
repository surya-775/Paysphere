import { Wallet } from "lucide-react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold">
      <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white grid place-items-center shadow-md">
        <Wallet className="h-5 w-5" />
      </div>
      <span className="text-lg">PaySphere</span>
    </Link>
  );
}
