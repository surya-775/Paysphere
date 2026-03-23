import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/assets/icons/Logo";
import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useParams } from "react-router";

export default function RegisterPage() {
  const { role } = useParams<{ role: "user" | "agent" }>();
  const navigate = useNavigate();

  const currentTab = role === "user" ? "user" : "agent";

  const handleTabChange = (value: string) => {
    navigate(`/register/${value}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/20 px-4 relative">
      <div className="absolute top-4 left-6">
        <Logo />
      </div>
      <div className="w-full max-w-96">
        <Card className="rounded-2xl shadow-xl border border-primary/20">
          <CardHeader className="text-center  py-0">
            <CardTitle className="text-2xl font-bold text-primary">
              Create Account ✨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full border grid-cols-2 mb-2">
                <TabsTrigger value="user" type="button">User</TabsTrigger>
                <TabsTrigger value="agent" type="button">Agent</TabsTrigger>
              </TabsList>

              {currentTab === "user" && <RegisterForm role="user" />}
              {currentTab === "agent" && <RegisterForm role="agent" />}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
