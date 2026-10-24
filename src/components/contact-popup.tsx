import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact-form";

export function ContactPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-lg p-0">
        <div className="p-5 md:p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-heading text-xl md:text-2xl text-center">
              Get in Touch
            </DialogTitle>
            <DialogDescription className="text-center text-foreground/70 text-sm">
              Fill out the form and we'll respond within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
