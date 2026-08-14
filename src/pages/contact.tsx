import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { Mail, Globe } from "lucide-react";

export default function Contact() {
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
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Whether you are a parent seeking support, a school looking to collaborate, or a professional looking to join our network, we are here to answer your questions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white/50 rounded-[32px] p-8 shadow-sm text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-primary-foreground mb-4">
                <Mail size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Email</h3>
              <a href="mailto:info@adaptivelearningsupport.com" className="text-foreground/70 hover:text-accent transition-colors break-all">
                info@adaptivelearningsupport.com
              </a>
            </div>

            <div className="bg-white/50 rounded-[32px] p-8 shadow-sm text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center text-primary-foreground mb-4">
                <Globe size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">Website</h3>
              <a href="https://adaptivelearningsupport.com" className="text-foreground/70 hover:text-accent transition-colors break-all">
                adaptivelearningsupport.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
