import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    {
      q: "How secure is PaySphere?",
      a: "We use JWT-based auth, hashed passwords, and role-based permissions. Your data is encrypted in transit.",
    },
    {
      q: "Is there any fee to send money?",
      a: "Starter plan is free with standard fees disclosed at checkout. Pro users enjoy reduced fees.",
    },
    {
      q: "Can I use it as an agent?",
      a: "Yes. Create an agent account during registration to enable cash-in and cash-out tools.",
    },
    {
      q: "Do you have a mobile app?",
      a: "This web app is fully responsive and PWA-ready. Native apps are on the roadmap.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground mt-2">
            Quick answers to common questions.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem value={`item-${idx}`} key={idx}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
