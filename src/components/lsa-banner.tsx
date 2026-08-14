import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LsaEnquiryForm } from "@/components/lsa-enquiry-form";

export function LsaBanner() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
          className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8"
        >
          <div className="relative group">
            <button
              onClick={() => setDismissed(true)}
              className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-md bg-white/90 text-foreground/40 shadow-sm hover:text-foreground/70 transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2.5 rounded-lg bg-[#97BCC8] px-5 py-3 text-sm font-heading font-semibold text-white shadow-lg shadow-[#97BCC8]/25 hover:bg-[#7eaab7] hover:shadow-xl hover:shadow-[#97BCC8]/30 transition-all hover:-translate-y-0.5"
            >
              <Users size={16} />
              <span>Need a Learning Support Assistant?</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto rounded-none p-0">
          <div className="p-4 md:p-5">
            <DialogHeader className="sr-only">
              <DialogTitle>Request a Learning Support Assistant</DialogTitle>
              <DialogDescription>
                Fill out the form and we will match you with the right support.
              </DialogDescription>
            </DialogHeader>
            <LsaEnquiryForm onClose={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
