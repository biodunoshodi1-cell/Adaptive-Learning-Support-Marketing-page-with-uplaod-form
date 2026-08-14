import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const services = [
    {
      title: "Summer Holiday Tutoring",
      desc: "Engaging, personalised tutoring sessions to keep your child learning and thriving over the summer break",
      img: "/service-1.png",
      link: "/summer-tutoring",
    },
    {
      title: "ABA Home Therapy Sessions",
      desc: "Applied Behaviour Analysis therapy delivered in the comfort and familiarity of your own home",
      img: "/service-2.png",
      link: "/aba-therapy",
    },
    {
      title: "Parent & LSAs Support Workshop",
      desc: "Collaborative workshops empowering parents and learning support assistants with practical skills and strategies",
      img: "/service-3.png",
      link: "/workshop",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <section className="relative flex min-h-[72vh] w-full items-center justify-center overflow-hidden bg-[#97BCC8]/10 py-24">
        <div className="absolute inset-0 z-0">
          <img src="/hero.png" alt="Children learning in a classroom" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-white/45" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-7xl"
          >
            Working to ensure every SEN child is known, valued and understood
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
            Specialist support for families and schools, delivered with warmth, clarity, and care.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp}>
              <span className="mb-5 inline-block rounded-full bg-[#97BCC8]/15 px-5 py-2 text-sm font-heading font-semibold text-[#97BCC8]">
                About Adaptive Learning Support
              </span>
              <h2 className="mb-5 font-display text-3xl font-bold leading-snug text-foreground/90 md:text-4xl">
                Specialist SEN support - at home and in school
              </h2>
              <p className="text-lg leading-relaxed text-foreground/75">
                Personalised support. Real progress. Confident learners.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/75">
                We deliver home-based 1-to-1 therapy sessions, summer holiday tutoring, and expert support workshops for parents and LSAs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#97BCC8]/5 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-foreground/90 md:text-4xl">Our Services</h2>
            <p className="mt-4 text-foreground/70">A simple overview of how we support children and families.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <motion.a key={index} href={service.link} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeInUp} className="group text-center transition-transform hover:-translate-y-1">
                <div className="mx-auto mb-5 h-56 w-56 overflow-hidden rounded-full border border-[#97BCC8]/20 shadow-sm">
                  <img src={service.img} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-foreground/90">{service.title}</h3>
                <p className="mx-auto max-w-[260px] text-foreground/65">{service.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 md:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-foreground/90 md:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-foreground/70">Reach out to us to discuss your needs.</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
