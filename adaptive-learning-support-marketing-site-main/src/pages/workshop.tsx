import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2, Users, Lightbulb, BookOpen, MessageCircle,
  HandHeart, Award, TrendingUp, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitNetlifyForm } from "@/lib/netlify-forms";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  role: z.string().min(1, "Please select your role"),
  organisation: z.string().optional(),
  workshopInterest: z.string().optional(),
  groupSize: z.string().optional(),
  preferredDate: z.string().optional(),
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

const whoFor = [
  {
    icon: HandHeart,
    title: "Parents & Carers",
    desc: "Gain practical strategies to support your child's learning and behaviour at home — and feel more confident in your role alongside professionals.",
  },
  {
    icon: Users,
    title: "Learning Support Assistants",
    desc: "Deepen your skills, explore evidence-based approaches, and grow your professional toolkit for working with children with SEN.",
  },
  {
    icon: BookOpen,
    title: "School Staff & SENCOs",
    desc: "Build a stronger, more consistent support network across your setting with bespoke training tailored to your school's needs.",
  },
];

const topics = [
  { icon: MessageCircle, label: "Understanding & Supporting Autism" },
  { icon: TrendingUp, label: "Positive Behaviour Support" },
  { icon: Lightbulb, label: "Sensory Processing & Regulation" },
  { icon: BookOpen, label: "AAC & Communication Strategies" },
  { icon: HandHeart, label: "Trauma-Informed Practice" },
  { icon: Award, label: "Effective LSA Practice" },
  { icon: Users, label: "Parent-Professional Partnership" },
  { icon: MessageCircle, label: "Anxiety & Emotional Wellbeing" },
];

const benefits = [
  "Delivered by experienced SEN specialists",
  "Practical, hands-on learning — not just theory",
  "Small groups to allow meaningful discussion",
  "Tailored to your specific setting and needs",
  "CPD certificates available for professionals",
  "Follow-up support and resources included",
];

const formats = [
  {
    title: "Half-Day Workshop",
    duration: "3 hours",
    desc: "An intensive focused session on a single topic — ideal for busy schedules or as an introduction.",
    ideal: "Introductory training, one key theme",
  },
  {
    title: "Full-Day Workshop",
    duration: "6 hours",
    desc: "A deep dive into a topic with time for reflection, practice, and Q&A.",
    ideal: "In-depth professional development",
  },
  {
    title: "Workshop Series",
    duration: "Multiple sessions",
    desc: "A programme of connected sessions over weeks or months for sustained learning and growth.",
    ideal: "School-wide CPD, ongoing parent groups",
  },
];

export default function Workshop() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      organisation: "",
      workshopInterest: "",
      groupSize: "",
      preferredDate: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await submitNetlifyForm("workshop-enquiry", values);
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
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#97BCC8]/15"
              style={{
                width: `${70 + i * 55}px`,
                height: `${70 + i * 55}px`,
                top: `${15 + i * 15}%`,
                left: `${-2 + i * 22}%`,
              }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.6 }}
            />
          ))}
        </div>
        <div className="container relative mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-[#97BCC8] px-5 py-2 text-sm font-heading font-semibold text-white mb-6">
              <Users size={16} />
              For Parents, LSAs & School Staff
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Parent & LSAs Support<br />
              <span className="text-[#97BCC8]">Workshops That Make a Difference</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto leading-relaxed">
              Practical, warm, and genuinely useful training for everyone who supports children with SEN — because when the adults around a child grow, the child grows too.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#register"
                className="inline-block rounded-full bg-[#97BCC8] px-10 py-4 text-lg font-heading font-semibold text-white shadow-md hover:bg-[#7eaab7] transition-colors"
                data-testid="button-hero-cta"
              >
                Book a Workshop
              </a>
              <a
                href="#topics"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#97BCC8] px-8 py-4 text-lg font-heading font-semibold text-[#97BCC8] hover:bg-[#97BCC8]/10 transition-colors"
                data-testid="button-topics-link"
              >
                See Topics <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Who Are These Workshops For?</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Our workshops bring parents and professionals together — because collaboration is the heart of great support.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {whoFor.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-4 rounded-3xl border border-[#97BCC8]/30 bg-[#97BCC8]/5 p-8 hover:shadow-md transition-shadow"
                data-testid={`card-who-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#97BCC8]/20 text-[#97BCC8]">
                  <item.icon size={26} />
                </div>
                <h3 className="font-heading text-xl font-semibold">{item.title}</h3>
                <p className="text-foreground/65 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="py-24 bg-[#97BCC8]/10 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Workshop Topics</h2>
            <p className="text-foreground/70 text-lg mb-12 max-w-2xl mx-auto">
              We cover a wide range of subjects — each one rooted in current research and real-world practice. Topics can also be customised to your group's specific needs.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-4"
          >
            {topics.map((topic) => (
              <motion.div
                key={topic.label}
                variants={fadeInUp}
                className="flex items-center gap-3 rounded-full bg-white border border-[#97BCC8]/40 px-6 py-3 shadow-sm text-sm font-heading font-medium hover:border-[#97BCC8] hover:shadow-md transition-all"
                data-testid={`badge-topic-${topic.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <topic.icon size={16} className="text-[#97BCC8]" />
                {topic.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Workshop Formats</h2>
            <p className="text-foreground/70 text-lg">Choose what works best for your group.</p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {formats.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                className="flex flex-col gap-3 rounded-3xl border-2 border-[#97BCC8]/25 bg-[#97BCC8]/5 p-8 hover:border-[#97BCC8]/60 hover:shadow-md transition-all"
                data-testid={`card-format-${f.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="inline-block rounded-full bg-[#97BCC8] px-4 py-1 text-xs font-heading font-semibold text-white w-fit">
                  {f.duration}
                </span>
                <h3 className="font-heading text-xl font-bold">{f.title}</h3>
                <p className="text-foreground/65 text-sm leading-relaxed flex-1">{f.desc}</p>
                <p className="text-xs text-foreground/50 border-t border-[#97BCC8]/20 pt-3 mt-1">
                  <span className="font-semibold">Ideal for:</span> {f.ideal}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="bg-[#97BCC8] py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-2xl md:text-3xl font-bold text-white text-center mb-10">
              What Every Workshop Includes
            </motion.h2>
            <motion.div variants={stagger} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <motion.div
                  key={b}
                  variants={fadeInUp}
                  className="flex items-center gap-3 rounded-2xl bg-white/20 px-5 py-4"
                  data-testid={`benefit-${b.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CheckCircle2 size={20} className="flex-shrink-0 text-white" />
                  <span className="text-white font-medium text-sm">{b}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="register" className="py-24 bg-[#97BCC8]/10 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Book a Workshop</h2>
            <p className="text-foreground/70 text-lg">
              Tell us a little about what you need and we'll get back to you within 48 hours to discuss dates, topics, and logistics.
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
              <h3 className="font-heading text-2xl font-bold">Enquiry Received!</h3>
              <p className="text-foreground/70 max-w-md leading-relaxed">
                Thank you for your interest in our workshops. We'll be in touch within 48 hours to discuss how we can support your group.
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Smith" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Your Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-role">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Parent / Carer">Parent / Carer</SelectItem>
                              <SelectItem value="Learning Support Assistant">Learning Support Assistant</SelectItem>
                              <SelectItem value="Teacher / Class Teacher">Teacher / Class Teacher</SelectItem>
                              <SelectItem value="SENCO">SENCO</SelectItem>
                              <SelectItem value="School Leader">School Leader</SelectItem>
                              <SelectItem value="Other Professional">Other Professional</SelectItem>
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
                          <FormLabel className="font-heading">Email Address</FormLabel>
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
                    name="organisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">School / Organisation (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Greenfield Primary School" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-organisation" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="workshopInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Topic of Interest</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-workshop-interest">
                                <SelectValue placeholder="Select a topic (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Understanding & Supporting Autism">Understanding & Supporting Autism</SelectItem>
                              <SelectItem value="Positive Behaviour Support">Positive Behaviour Support</SelectItem>
                              <SelectItem value="Sensory Processing & Regulation">Sensory Processing & Regulation</SelectItem>
                              <SelectItem value="AAC & Communication Strategies">AAC & Communication Strategies</SelectItem>
                              <SelectItem value="Trauma-Informed Practice">Trauma-Informed Practice</SelectItem>
                              <SelectItem value="Effective LSA Practice">Effective LSA Practice</SelectItem>
                              <SelectItem value="Parent-Professional Partnership">Parent-Professional Partnership</SelectItem>
                              <SelectItem value="Anxiety & Emotional Wellbeing">Anxiety & Emotional Wellbeing</SelectItem>
                              <SelectItem value="Not sure yet">Not sure yet — advise me</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="groupSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading">Expected Group Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="select-group-size">
                                <SelectValue placeholder="Select size (optional)" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Just me">Just me</SelectItem>
                              <SelectItem value="2–5 people">2–5 people</SelectItem>
                              <SelectItem value="6–15 people">6–15 people</SelectItem>
                              <SelectItem value="16–30 people">16–30 people</SelectItem>
                              <SelectItem value="30+ people">30+ people</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Preferred Date / Timeframe (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Summer term, September 2025, ASAP" {...field} className="rounded-full bg-[#97BCC8]/5 border-[#97BCC8]/30" data-testid="input-preferred-date" />
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
                            placeholder="Tell us about your group, specific goals, any challenges you'd like the workshop to address..."
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
                      {form.formState.isSubmitting ? "Sending…" : "Book My Workshop"}
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
