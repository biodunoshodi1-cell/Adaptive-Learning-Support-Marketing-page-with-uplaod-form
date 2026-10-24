import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Sun, Heart, Users, Phone } from "lucide-react";
import { SiFacebook, SiTiktok, SiWhatsapp, SiInstagram } from "react-icons/si";

const services = [
  {
    href: "/aba-therapy",
    label: "ABA Home Therapy Sessions",
    desc: "Expert therapy in the comfort of your home",
    icon: Heart,
  },
  {
    href: "/summer-tutoring",
    label: "Summer Holiday Tutoring",
    desc: "Keep children learning and thriving all summer",
    icon: Sun,
  },
  {
    href: "/workshop",
    label: "Parent & LSAs Support Workshop",
    desc: "Practical training for parents and professionals",
    icon: Users,
  },
];

const whatsappHref = "https://wa.me/971544078461";
const facebookHref = "https://www.facebook.com/share/1B5NcuXKV2/";
const instagramHref = "https://www.instagram.com/adaptivelearningsupport/";
const tiktokHref = "https://www.tiktok.com/@adaptivelearningsupport?_r=1&_t=ZS-96GtXPTpHex";
const contactFormHref = "/contact#contact-form";

export function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isServiceActive = services.some((s) => s.href === location);

  const isHome = location === "/" || location === "" || location === "/index.html";

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors hover:text-accent ${active ? "text-accent" : "text-foreground/80"}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Top line: page links + WhatsApp */}
      <div className="flex items-center gap-3 border-b border-accent/30 bg-[#97BCC8]/10 px-4 py-1.5 md:gap-8 md:px-8">
        <div className="mr-auto">
          {!isHome && (
            <Link href="/" onClick={() => { setMenuOpen(false); setDropdownOpen(false); }} className="block transition-opacity hover:opacity-80">
              <img src="/als-logo.png" alt="Adaptive Learning Support" className="h-10 w-auto object-contain" />
            </Link>
          )}
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={linkClass(location === "/")}>Home</Link>
          <div ref={dropdownRef} className="relative">
            <button onClick={() => setDropdownOpen((p) => !p)} className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent ${isServiceActive ? "text-accent" : "text-foreground/80"}`}>
              Our Services
              <ChevronDown size={15} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border border-accent/20 bg-white shadow-xl overflow-hidden">
                <div className="p-2">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} onClick={() => setDropdownOpen(false)} className={`flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-[#97BCC8]/10 group ${location === service.href ? "bg-[#97BCC8]/10" : ""}`}>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#97BCC8]/15 text-[#97BCC8] group-hover:bg-[#97BCC8]/25 transition-colors mt-0.5">
                        <service.icon size={16} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-snug ${location === service.href ? "text-[#97BCC8]" : "text-foreground/90"}`}>{service.label}</p>
                        <p className="text-xs text-foreground/55 mt-0.5 leading-snug">{service.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href={contactFormHref} className={linkClass(location === "/contact")}>Contact</Link>
        </div>

        <a href={whatsappHref} target="_blank" rel="noreferrer" className="hidden items-center gap-2 border-l border-foreground/15 pl-8 text-sm font-medium text-foreground/75 transition-colors hover:text-[#97BCC8] md:flex">
          <SiWhatsapp size={14} className="text-[#97BCC8]" />
          +971 544 078 461
        </a>

        {/* Mobile: WhatsApp + menu button */}
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center justify-center rounded-full bg-[#97BCC8]/15 p-1.5 text-[#97BCC8] transition-colors hover:bg-[#97BCC8]/30 md:hidden" aria-label="Chat on WhatsApp">
          <SiWhatsapp size={18} />
        </a>
        <button className="flex items-center justify-center rounded-lg p-1.5 text-foreground/70 transition-colors hover:bg-accent/10 hover:text-accent md:hidden" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-accent/30 bg-background/98 shadow-lg md:hidden">
          <div className="flex flex-col py-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className={`px-6 py-4 text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent ${location === "/" ? "text-accent border-l-4 border-accent bg-accent/5 pl-5" : "text-foreground/80"}`}>Home</Link>
            <button onClick={() => setMobileServicesOpen((p) => !p)} className={`flex items-center justify-between px-6 py-4 text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent text-left ${isServiceActive ? "text-accent border-l-4 border-accent bg-accent/5 pl-5" : "text-foreground/80"}`}>
              Our Services
              <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="bg-[#97BCC8]/5 border-y border-[#97BCC8]/15">
                {services.map((service) => (
                  <Link key={service.href} href={service.href} onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }} className={`flex items-center gap-3 px-8 py-3.5 text-sm transition-colors hover:bg-accent/10 hover:text-accent ${location === service.href ? "text-accent font-semibold" : "text-foreground/75"}`}>
                    <service.icon size={15} className="text-[#97BCC8] shrink-0" />
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href={contactFormHref} onClick={() => setMenuOpen(false)} className={`px-6 py-4 text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent ${location === "/contact" ? "text-accent border-l-4 border-accent bg-accent/5 pl-5" : "text-foreground/80"}`}>Contact</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-4 text-base font-medium text-[#97BCC8] hover:bg-accent/10 transition-colors border-t border-accent/20 mt-1">
              <SiWhatsapp size={18} />
              +971 544 078 461
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-accent bg-background py-12">
      <div className="container mx-auto px-4 text-center md:px-8">
        <div className="mb-6">
          <img src="/als-logo.png" alt="Adaptive Learning Support" className="h-28 w-auto object-contain mx-auto mb-4" />
        </div>
        <div className="mb-8 flex justify-center gap-6">
          <a href={facebookHref} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-foreground transition-transform hover:scale-110" aria-label="Facebook"><SiFacebook size={20} /></a>
          <a href={instagramHref} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-foreground transition-transform hover:scale-110" aria-label="Instagram"><SiInstagram size={20} /></a>
          <a href={tiktokHref} target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-foreground transition-transform hover:scale-110" aria-label="TikTok"><SiTiktok size={20} /></a>
        </div>
        <p className="mb-2 font-heading text-lg font-semibold">Adaptive Learning Support</p>
        <p className="mb-5 text-sm text-foreground/70">Working to ensure every SEN child is known, valued and understood</p>
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-foreground/80 md:flex-row md:gap-6">
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#97BCC8] transition-colors">
            <SiWhatsapp size={14} className="text-[#97BCC8]" />
            +971 544 078 461
          </a>
          <a href="mailto:info@adaptivelearningsupport.com" className="hover:underline">info@adaptivelearningsupport.com</a>
          <a href="https://adaptivelearningsupport.com" className="hover:underline">adaptivelearningsupport.com</a>
        </div>
        <p className="mt-8 text-xs text-foreground/50">&copy; {new Date().getFullYear()} Adaptive Learning Support. All rights reserved.</p>
      </div>
    </footer>
  );
}
