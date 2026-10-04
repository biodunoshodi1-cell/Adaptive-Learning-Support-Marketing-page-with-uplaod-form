import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Sun, Star, BookOpen, Palette, Music, Puzzle } from "lucide-react";
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
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  schoolYear: z.string().optional(),
  additionalNeeds: z.string().optional(),
  preferredStart: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const highlights = [
  {
    icon: Star,
    title: "Truly Individualised",
    desc: "Every session is planned around your child's unique learning profile, interests, and goals — not a one-size-fits-all curriculum.",
  },
  {
    icon: Sun,
    title: "Fun First",
    desc: "We believe learning happens best when children are engaged and enjoying themselves. Expect games, creative activities, and plenty of encouragement.",
  },
  {
    icon: BookOpen,
    title: "Expert Support",
    desc: "Our tutors are experienced in working with children with SEN, including autism, ADHD, dyslexia, and other learning differences.",
  },
  {
    icon: Puzzle,
    title: "Flexible Scheduling",
    desc: "Sessions run at a pace and time that suits your family — mornings, afternoons, or a mix throughout the week.",
  },
];

const activities = [
  { icon: Palette, label: "Creative Arts & Crafts" },
  { icon: BookOpen, label: "Literacy & Storytelling" },
  { icon: Puzzle, label: "Maths Through Play" },
  { icon: Music, label: "Music & Movement" },
  { icon: Star, label: "Life Skills Building" },
  { icon: Sun, label: "Outdoor Learning" },
];

const steps = [
  "Tell us about your child using the form below.",
  "We'll get in touch within 48 hours for a free consultation.",
  "We match your child with the most suitable tutor.",
  "Sessions begin — and the fun starts!",
];

export default function SummerTutoring() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      childName: "",
      childAge: "",
      email: "",
      phone: "",
      schoolYear: "",
      additionalNeeds: "",
      preferredStart: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitNetlifyForm("summer-enquiry", values);
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

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#97BCC8]/20 py-24 md:py-36">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#97BCC8]/20"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: `${10 + i * 12}%`,
                left: `${5 + i * 15}%`,
              }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.5 }}
            />
          ))}
        </div>
        <div className="container relative mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-[#97BCC8] px-5 py-2 text-sm font-heading font-semibold text-white mb-6">
              <Sun size={16} />
              Summer 2026 Now Open
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Summer Holiday Tutoring<br />
              <span className="text-[#97BCC8]">Made for Every Child</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              We offer individualised, fun-filled summer tutoring sessions designed around your child's unique needs — keeping their curiosity alive and confidence growing all summer long.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <a
                href="#enquire"
                className="inline-block rounded-full bg-[#97BCC8] px-10 py-4 text-lg font-heading font-semibold text-white shadow-md hover:bg-[#7eaab7] transition-colors"
                data-testid="button-hero-cta"
              >
                Start the Process
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Individualised. Joyful. Effective.
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              No child is the same, and neither are our sessions. Here's what sets Adaptive Learning Support apart this summer.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-2"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex gap-5 rounded-3xl border border-[#97BCC8]/30 bg-[#97BCC8]/5 p-7 hover:shadow-md transition-shadow"
                data-testid={`card-highlight-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#97BCC8]/20 text-[#97BCC8]">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-[#97BCC8]/10">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What a Session Looks Like
            </h2>
            <p className="text-foreground/70 text-lg mb-12 max-w-xl mx-auto">
              Activities are tailored to every child — here are some of the things we weave into learning:
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-4"
          >
            {activities.map((act) => (
              <motion.div
                key={act.label}
                variants={fadeInUp}
                className="flex items-center gap-3 rounded-full bg-white border border-[#97BCC8]/40 px-6 py-3 shadow-sm text-sm font-heading font-medium"
                data-testid={`badge-activity-${act.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <act.icon size={16} className="text-[#97BCC8]" />
                {act.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-foreground/70 text-lg">Getting started is simple.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative"
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="flex items-start gap-6 mb-8 last:mb-0"
                data-testid={`step-${idx + 1}`}
              >
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#97BCC8] text-white font-heading font-bold text-lg shadow-md">
                  {idx + 1}
                </div>
                <div className="flex items-center min-h-12">
                  <p className="text-lg font-medium text-foreground/80 leading-snug">{step}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reassurance strip */}
      <section className="bg-[#97BCC8] py-14">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-4">
              <Star size={32} className="text-white/80" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Every child deserves to be understood and supported.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
              We take the time to truly know your child — their strengths, their challenges, and what makes them smile — so that every session feels purposeful and kind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquire" className="py-24 bg-[#97BCC8]/10 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Make an Enquiry</h2>
            <p className="text-foreground/70 text-lg">
              Fill in the form below and our team will be in touch within 48 hours for a free, no-obligation consultation.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-5 rounded-3xl bg-white p-12 text-center shadow-sm border border-[#97BCC8]/30"
              data-testid="success-message"
            >
              <CheckCircle2 size={56} className="text-[#97BCC8]" />
              <h3 className="font-heading text-2xl font-bold">Thank You!</h3>
              <p className="text-foreground/70 max-w-md leading-relaxed">
                We've received your enquiry and will be in touch within 48 hours. We look forward to speaking with you about how we can support your child.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm text-[#97BCC8] underline underline-offset-4 hover:text-[#7eaab7]"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="rounded-3xl bg-white p-8 md:p-12 shadow-sm border border-[#97BCC8]/20"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Parent / Guardian Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-parent-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="childName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Child's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Lily" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-child-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="childAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Child's Age</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-child-age">
                                <SelectValue placeholder="Select age" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 16 }, (_, i) => i + 2).map((age) => (
                                <SelectItem key={age} value={String(age)}>{age} years old</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="schoolYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">School Year / Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-school-year">
                                <SelectValue placeholder="Select year (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Nursery / Reception">Nursery / Reception</SelectItem>
                              <SelectItem value="Year 1">Year 1</SelectItem>
                              <SelectItem value="Year 2">Year 2</SelectItem>
                              <SelectItem value="Year 3">Year 3</SelectItem>
                              <SelectItem value="Year 4">Year 4</SelectItem>
                              <SelectItem value="Year 5">Year 5</SelectItem>
                              <SelectItem value="Year 6">Year 6</SelectItem>
                              <SelectItem value="Year 7+">Year 7+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Your Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@example.com" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+971 50 123 4567" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalNeeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Additional Needs / Diagnosis (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Autism, ADHD, Dyslexia, or any relevant details" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-additional-needs" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Preferred Start Date (Optional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-preferred-start" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Anything else you'd like us to know?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your child's interests, what they enjoy, or any questions you have..."
                            className="min-h-[130px] resize-none rounded-3xl bg-[#97BCC8]/5 border-[#97BCC8]/30"
                            {...field}
                            data-testid="textarea-message"
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
                      className="w-full max-w-sm rounded-full bg-[#97BCC8] text-white hover:bg-[#7eaab7] text-lg h-14 font-heading font-semibold shadow-md"
                      data-testid="button-submit"
                    >
                      {form.formState.isSubmitting ? "Sending…" : "Register My Interest"}
                    </Button>
                    <p className="mt-4 text-sm text-foreground/50">
                      Your information is sent directly to <span className="font-medium">info@adaptivelearningsupport.com</span>
                    </p>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
