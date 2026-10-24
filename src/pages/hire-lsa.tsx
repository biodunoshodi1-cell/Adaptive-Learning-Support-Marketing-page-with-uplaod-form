import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { CheckCircle2 } from "lucide-react";

export default function HireLsa() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const steps = [
    "Initial consultation to understand your child's unique needs.",
    "Matching process leveraging our network of qualified professionals.",
    "Interview and trial sessions to ensure a perfect fit.",
    "Ongoing support and communication to monitor progress."
  ];

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground/90 mb-6">
            Hire a Learning Support Assistant
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Finding the right LSA is a crucial step in ensuring your child receives the focused, empathetic support they need to thrive. We take the time to understand your requirements and meticulously match you with dedicated professionals.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
          }}
          className="bg-white/50 rounded-[32px] p-8 md:p-12 mb-20 shadow-sm"
        >
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">Our Matching Process</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-accent">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-foreground/80 font-medium text-lg leading-snug">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-semibold mb-4">Start the Process</h2>
            <p className="text-foreground/70">Fill out the form below and select "Parent Enquiry" or "School Enquiry".</p>
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
