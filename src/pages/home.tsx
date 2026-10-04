import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { HeroSlideshow } from "@/components/hero-slideshow";

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
      <section className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-white py-24 text-[#1b2a6c]">
        <div className="absolute inset-0 z-0">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6ec]/80 via-[#fbf6ec]/45 to-transparent" />
          {/* soft fade into the white page below */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/70 to-transparent" />
          {/* Faint static logo watermark: sits above the photos, below the text, never moves */}
          <img
            src="/als-logo.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] top-1/2 h-[62%] max-h-[520px] w-auto -translate-y-1/2 select-none object-contain opacity-[0.30] md:right-[6%]"
          />
        </div>
                <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 inline-block rounded-full border border-[#1b2a6c]/40 px-5 py-1.5 text-xs font-normal uppercase tracking-[0.14em] text-[#1b2a6c] md:text-sm"
            >
              Specialist SEN Support
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-4 text-5xl font-normal leading-[1.05] text-[#1b2a6c] md:text-6xl lg:text-7xl"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Learning that <em className="italic text-[#e8743f]">adapts</em> to every child
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#c9531c] md:text-base"
            >
              Specialized Special Educational Needs Support for Schools and Families
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-8 text-lg font-normal leading-relaxed text-[#1b2a6c]/90"
            >
              Summer tutoring, ABA home therapy, and workshops for parents and LSAs — patient, personalised support that helps every learner thrive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#services"
                className="inline-block rounded-full bg-[#ff8a5b] px-8 py-4 text-base font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Our services
              </a>
              <a
                href="/contact#contact-form"
                className="inline-block rounded-full border border-[#1b2a6c] px-8 py-4 text-base font-medium text-[#1b2a6c] transition-all hover:-translate-y-0.5 hover:bg-[#1b2a6c] hover:text-white"
              >
                Book a call
              </a>
            </motion.div>
          </div>
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

      <section id="services" className="scroll-mt-24 bg-[#97BCC8]/5 py-20">
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
