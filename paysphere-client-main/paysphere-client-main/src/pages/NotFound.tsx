import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/assets/icons/Logo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <Card className="w-full max-w-md text-center border-0 text-card-foreground rounded-xl">
        <CardContent className="space-y-6 py-2">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="text-6xl font-extrabold text-destructive">404</h1>
          <p className="text-lg text-muted-foreground">
            Oops! The page you are looking for does not exist.
          </p>
          <Button
            className="mt-4 w-full bg-primary text-primary-foreground hover:brightness-90 transition-all duration-200"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
