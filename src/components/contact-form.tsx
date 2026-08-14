import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitNetlifyForm } from "@/lib/netlify-forms";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message is too short"),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitNetlifyForm("contact-enquiry", values);

      toast({
        title: "Message Sent",
        description: "Thank you for getting in touch. We'll respond shortly.",
      });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@adaptivelearningsupport.com",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-card p-5 md:p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@example.com" type="email" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+44 7700 900077" type="tel" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md bg-background">
                        <SelectValue placeholder="Select an enquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Parent Enquiry">Parent Enquiry</SelectItem>
                      <SelectItem value="School Enquiry">School Enquiry</SelectItem>
                      <SelectItem value="LSA Application">LSA Application</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-sm">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[100px] resize-none rounded-lg bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="text-center pt-2">
            <Button type="submit" size="lg" className="w-full max-w-sm rounded-md bg-accent text-primary-foreground hover:bg-accent/90 text-lg h-12">
              Send Message
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
