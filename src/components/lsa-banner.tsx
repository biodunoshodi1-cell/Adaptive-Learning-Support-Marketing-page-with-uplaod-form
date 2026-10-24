import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { JobApplicationForm } from "@/components/job-application-form";

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
              <Briefcase size={16} />
              <span>Apply for a LSA Role</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-xl sm:max-w-xl md:max-w-2xl max-h-[95vh] overflow-y-auto rounded-none sm:rounded-none p-0">
          <div className="p-4 md:p-5">
            <DialogHeader className="sr-only">
              <DialogTitle>Apply for a Learning Support Assistant Role</DialogTitle>
              <DialogDescription>
                Fill out the form and attach your CV to apply.
              </DialogDescription>
            </DialogHeader>
            <JobApplicationForm compact onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
