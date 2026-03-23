import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileForm from "@/components/modules/Profile/ProfileForm";
import { useUserInfoQuery } from "@/redux/features/auth/auth";
import ChangePasswordForm from "@/components/modules/Authentication/ChangePasswordForm";

export default function ProfilePage() {
  const { data: userInfo } = useUserInfoQuery();

  return (
    <div className="w-full max-w-4xl mx-auto py-2 space-y-6">
      <Card className="shadow-md border rounded-2xl">
        {/* User Header */}
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Avatar */}
            <Avatar className="h-20 w-20 border border-muted-foreground">
              <AvatarImage src="/avatars/01.png" alt="User avatar" />
              <AvatarFallback>
                {userInfo?.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {userInfo?.name || "User"}
              </h2>
              <p className="text-sm text-muted-foreground">{userInfo?.email}</p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  Role: {userInfo?.role}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userInfo?.isActive === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {userInfo?.isActive}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userInfo?.isApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {userInfo?.isApproved ? "Approved" : "Not Approved"}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tabs */}
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2 rounded-xl bg-muted/30 p-1">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <ProfileForm />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
               <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Change Password
                </h3>
                <ChangePasswordForm />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
