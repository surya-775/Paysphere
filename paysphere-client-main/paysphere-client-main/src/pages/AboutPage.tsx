import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold">About PaySphere</h1>
          <p className="text-lg text-muted-foreground">
            PaySphere is a modern digital wallet designed to make sending,
            receiving, and managing money effortless and secure. Our platform
            serves users, agents, and admins with tailored dashboards and
            features.
          </p>
          <div className="grid gap-6">
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                To empower everyone with a fast, reliable, and secure digital
                wallet experience.
              </CardContent>
            </Card>
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                To become the leading platform for digital finance solutions
                across multiple countries.
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
