import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitNetlifyForm } from "@/lib/netlify-forms";

const formSchema = z.object({
  parentName: z.string().min(2, "Please enter your name"),
  childName: z.string().min(1, "Please enter your child's name"),
  childAge: z.string().min(1, "Please select an age"),
  diagnosis: z.string().optional(),
  location: z.string().min(1, "Please select a location"),
  phone: z.string().min(1, "Please enter a phone number"),
  description: z.string().min(10, "Please provide more details (at least 10 characters)"),
  email: z.string().email("Please enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

const locations = [
  "Dubai",
  "Abu Dhabi",
  "Fujairah",
  "Ajman",
  "Ras Al Khaimah",
  "Umm Al Quwain",
];

interface LsaEnquiryFormProps {
  onClose: () => void;
}

export function LsaEnquiryForm({ onClose }: LsaEnquiryFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      childName: "",
      childAge: "",
      diagnosis: "",
      location: "",
      phone: "",
      description: "",
      email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitNetlifyForm("lsa-enquiry", values);
      setSubmitted(true);
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at info@adaptivelearningsupport.com",
        variant: "destructive",
      });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 bg-white p-8 text-center rounded-none">
        <CheckCircle2 size={56} className="text-[#97BCC8]" />
        <h3 className="font-heading text-2xl font-bold">Thank You!</h3>
        <p className="text-foreground/70 max-w-md leading-relaxed">
          We have received your enquiry and will be in touch within 48 hours to discuss your LSA needs.
        </p>
        <button
          onClick={() => { setSubmitted(false); onClose(); }}
          className="mt-2 text-sm text-[#97BCC8] underline underline-offset-4 hover:text-[#7eaab7]"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-0 top-0 p-1.5 text-foreground/50 hover:bg-[#97BCC8]/10 hover:text-[#97BCC8] transition-colors rounded-none"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <h2 className="font-heading text-2xl font-bold text-center mb-1 pr-8">Request a Learning Support Assistant</h2>
      <p className="text-sm text-foreground/60 text-center mb-6">
        Tell us about your child and we'll match you with the right support.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="parentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Parent / Guardian Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none" />
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
                    <Input type="email" placeholder="jane@example.com" {...field} className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="childName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Child's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Lily" {...field} className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Child's Age</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 18 }, (_, i) => i + 2).map((age) => (
                        <SelectItem key={age} value={String(age)}>{age} years old</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none">
                        <SelectValue placeholder="Select emirate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+971 50 123 4567" {...field} className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-sm">Diagnosis / Needs (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Autism, ADHD, Dyslexia, or any relevant details" {...field} className="bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-sm">Tell us more about your needs</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What kind of support are you looking for? Any preferences for days, times, or specific skills?"
                    className="min-h-[120px] resize-none bg-[#97BCC8]/5 border-[#97BCC8]/30 rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="w-full max-w-sm bg-[#97BCC8] text-white hover:bg-[#7eaab7] text-lg h-14 font-heading font-semibold shadow-md rounded-none"
            >
              {form.formState.isSubmitting ? "Sending…" : "Submit Enquiry"}
            </Button>
            <p className="mt-3 text-xs text-foreground/50">
              Your information is sent directly to <span className="font-medium">info@adaptivelearningsupport.com</span>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
