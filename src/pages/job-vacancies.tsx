import { motion } from "framer-motion";
import { JobApplicationForm } from "@/components/job-application-form";

export default function JobVacancies() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            We are always looking for passionate, experienced Learning Support Assistants to join our network. If you are dedicated to helping SEN children thrive, we want to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white/50 rounded-[32px] p-8 md:p-12 mb-20 shadow-sm space-y-6 text-foreground/80 text-lg leading-relaxed"
        >
          <h2 className="font-display text-2xl font-semibold mb-4 text-foreground/90">The Role of an LSA</h2>
          <p>
            As a Learning Support Assistant with us, you will work closely with schools, parents, and SEN professionals to deliver tailored support. Your empathy, patience, and professional expertise will directly impact a child's confidence and academic journey.
          </p>
          <p>
            <strong>What we look for:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proven experience working with children with Special Educational Needs.</li>
            <li>Strong communication skills to liaise effectively with teachers and parents.</li>
            <li>A genuine passion for inclusive education.</li>
            <li>Relevant qualifications and background checks.</li>
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-semibold mb-4">Apply Today</h2>
            <p className="text-foreground/70">Fill out the form below and attach your CV — we'll be in touch soon.</p>
          </div>
          <JobApplicationForm />
        </motion.div>
      </div>
    </div>
  );
}
