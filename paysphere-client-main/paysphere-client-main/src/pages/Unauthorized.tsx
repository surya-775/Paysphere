import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="max-w-md w-full text-center shadow-lg animate-fadeIn">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-red-600 dark:text-red-400 mb-2">
            🚫 Access Denied
          </CardTitle>
          <CardDescription className="text-gray-700 dark:text-gray-200">
            Oops! You don’t have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
