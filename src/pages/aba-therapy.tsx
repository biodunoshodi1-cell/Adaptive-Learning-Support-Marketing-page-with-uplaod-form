import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Heart, Home, Users, Shield, Brain, Clock, Star } from "lucide-react";
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
  diagnosis: z.string().optional(),
  location: z.string().min(1, "Please enter your area"),
  therapyStatus: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const highlights = [
  {
    icon: Home,
    title: "In the Comfort of Home",
    desc: "Sessions take place in your child's own environment — where they feel safest and most at ease. This familiarity helps skills generalise naturally into everyday life.",
  },
  {
    icon: Brain,
    title: "Evidence-Based Practice",
    desc: "Applied Behaviour Analysis is one of the most thoroughly researched interventions for autism and developmental differences, with decades of proven outcomes.",
  },
  {
    icon: Heart,
    title: "Child-Led & Compassionate",
    desc: "Our therapists build genuine relationships with each child. Sessions are warm, positive, and motivating — never mechanical or repetitive.",
  },
  {
    icon: Users,
    title: "Family Involvement",
    desc: "We work with the whole family, not just the child. Parents and carers receive guidance so the progress made in sessions continues throughout the day.",
  },
  {
    icon: Shield,
    title: "Fully Qualified Therapists",
    desc: "Every therapist is trained, supervised, and experienced in delivering ABA therapy with children across a range of needs and ages.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Sessions are arranged around your family's routine — mornings, afternoons, or evenings, at a frequency that suits your child's programme.",
  },
];

const whatToExpect = [
  {
    number: "01",
    title: "Initial Assessment",
    desc: "We start with a thorough assessment of your child's current skills, goals, and interests to create a personalised ABA programme.",
  },
  {
    number: "02",
    title: "Matched Therapist",
    desc: "We carefully match your child with the therapist best suited to their personality, needs, and goals.",
  },
  {
    number: "03",
    title: "Home Sessions Begin",
    desc: "Therapy begins in your home with structured yet playful sessions, building skills step by step.",
  },
  {
    number: "04",
    title: "Regular Review & Progress Reports",
    desc: "We review goals regularly and keep you informed with clear progress updates so you always see how your child is developing.",
  },
];

export default function AbaTherapy() {
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
      diagnosis: "",
      location: "",
      therapyStatus: "",
      availability: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitNetlifyForm("aba-enquiry", values);
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
      <section className="relative overflow-hidden bg-[#97BCC8]/15 py-24 md:py-36">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#97BCC8]/15"
              style={{
                width: `${60 + i * 50}px`,
                height: `${60 + i * 50}px`,
                bottom: `${5 + i * 10}%`,
                right: `${5 + i * 12}%`,
              }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.7 }}
            />
          ))}
        </div>
        <div className="container relative mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-[#97BCC8] px-5 py-2 text-sm font-heading font-semibold text-white mb-6">
              <Heart size={16} />
              Home-Based Therapy
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              ABA Home Therapy<br />
              <span className="text-[#97BCC8]">In Your Child's World</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              We bring expert Applied Behaviour Analysis therapy directly into your home — a compassionate, evidence-based approach that helps children build meaningful skills in the place they feel most comfortable.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10">
              <a
                href="#enquire"
                className="inline-block rounded-full bg-[#97BCC8] px-10 py-4 text-lg font-heading font-semibold text-white shadow-md hover:bg-[#7eaab7] transition-colors"
                data-testid="button-hero-cta"
              >
                Make an Enquiry
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is ABA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-3xl md:text-4xl font-bold mb-6">
              What is ABA Therapy?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed mb-6 max-w-3xl mx-auto">
              Applied Behaviour Analysis (ABA) is a structured, play-based approach to therapy that focuses on understanding how behaviour works and using that understanding to increase helpful behaviours and reduce those that affect a child's quality of life.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              It is widely used to support children with autism spectrum disorder (ASD), ADHD, and other developmental differences — helping them develop communication, social, self-care, and learning skills in a positive, rewarding environment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why Home-Based */}
      <section className="py-24 bg-[#97BCC8]/10">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose Home-Based ABA?
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Delivering therapy in your home offers real advantages for your child's learning and wellbeing.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex flex-col gap-4 rounded-3xl border border-[#97BCC8]/30 bg-white p-7 hover:shadow-md transition-shadow"
                data-testid={`card-highlight-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#97BCC8]/20 text-[#97BCC8]">
                  <item.icon size={22} />
                </div>
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="text-foreground/65 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What to Expect</h2>
            <p className="text-foreground/70 text-lg">From first contact to ongoing sessions, here's how it works.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-2"
          >
            {whatToExpect.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="flex gap-5 rounded-3xl border border-[#97BCC8]/20 bg-[#97BCC8]/5 p-7"
                data-testid={`step-${step.number}`}
              >
                <span className="flex-shrink-0 font-heading text-4xl font-bold text-[#97BCC8]/40 leading-none">{step.number}</span>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/65 leading-relaxed">{step.desc}</p>
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
                      name="diagnosis"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Diagnosis / Condition (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ASD, ADHD, Global Delay" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-diagnosis" />
                          </FormControl>
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
                            <Input type="tel" placeholder="+44 7700 900077" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Your Area / Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. North London, Manchester, Birmingham" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="therapyStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Current Therapy Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-therapy-status">
                                <SelectValue placeholder="Select (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="New to ABA">New to ABA</SelectItem>
                              <SelectItem value="Currently receiving ABA">Currently receiving ABA</SelectItem>
                              <SelectItem value="Transitioning from another provider">Transitioning from another provider</SelectItem>
                              <SelectItem value="Previously had ABA">Previously had ABA</SelectItem>
                              <SelectItem value="Not sure">Not sure</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Preferred Days / Times</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Weekday mornings, afternoons" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-availability" />
                          </FormControl>
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
                        <FormLabel className="font-heading">Tell us about your child</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share anything you'd like us to know — your child's strengths, current challenges, goals, or any questions you have..."
                            className="min-h-[140px] resize-none rounded-3xl bg-[#97BCC8]/5 border-[#97BCC8]/30"
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
                      {form.formState.isSubmitting ? "Sending…" : "Book Therapy Session"}
                    </Button>
                    <p className="mt-4 text-sm text-foreground/50">
                      Your enquiry is sent directly to <span className="font-medium">info@adaptivelearningsupport.com</span>
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
