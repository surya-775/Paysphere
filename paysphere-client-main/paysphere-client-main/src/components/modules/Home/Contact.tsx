import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get in touch
          </h2>
          <p className="text-muted-foreground mt-2">
            Questions, feedback, or partnership ideas? Write to us.
          </p>
        </div>
        <Card className="rounded-3xl">
          <CardContent className="p-6">
            {loading ? (
              <div className="grid gap-3">
                <Skeleton className="h-10 w-full rounded-2xl" />
                <Skeleton className="h-10 w-full rounded-2xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-10 w-36 rounded-2xl" />
              </div>
            ) : submitted ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold">
                  Thanks! We received your message.
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll get back within 1–2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    required
                    placeholder="Your name"
                    className="rounded-2xl"
                  />
                  <Input
                    required
                    type="email"
                    placeholder="Email address"
                    className="rounded-2xl"
                  />
                </div>
                <Input placeholder="Subject" className="rounded-2xl" />
                <Textarea
                  required
                  placeholder="Message"
                  className="min-h-28 rounded-2xl"
                />
                <div>
                  <Button type="submit" className="rounded-2xl">
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
