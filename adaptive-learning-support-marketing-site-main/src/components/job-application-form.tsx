import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitNetlifyFormWithFile } from "@/lib/netlify-forms";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  position: z.string().min(2, "Please tell us which role you're applying for"),
  message: z.string().optional(),
});

export function JobApplicationForm() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
    },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setCvFile(null);
      return;
    }

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError("File is too large. Please upload a CV under 5MB.");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileError(null);
    setCvFile(file);
  }

  function clearFile() {
    setCvFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!cvFile) {
      setFileError("Please attach your CV before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNetlifyFormWithFile("job-application", values, cvFile, "cv");

      toast({
        title: "Application Sent",
        description: "Thank you for applying. We'll review your CV and be in touch soon.",
      });
      form.reset();
      clearFile();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email your CV directly to info@adaptivelearningsupport.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-card p-5 md:p-6 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jane@example.com" type="email" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+971 50 123 4567" type="tel" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-heading text-sm">Role Applying For</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Learning Support Assistant" {...field} className="rounded-md bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-heading text-sm">Tell us about your experience (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief note about your background and experience..."
                    className="min-h-[100px] resize-none rounded-lg bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="font-heading text-sm">Upload CV</FormLabel>
            <div className="mt-2">
              {!cvFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-background px-4 py-8 text-center transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <UploadCloud className="h-6 w-6 text-foreground/60" />
                  <span className="text-sm font-medium text-foreground/80">
                    Click to upload your CV
                  </span>
                  <span className="text-xs text-foreground/50">PDF or Word, up to 5MB</span>
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-input bg-background px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-5 w-5 shrink-0 text-accent" />
                    <span className="truncate text-sm text-foreground/80">{cvFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    aria-label="Remove file"
                    className="shrink-0 rounded-md p-1 text-foreground/50 hover:bg-muted hover:text-foreground/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_EXTENSIONS}
                onChange={handleFileChange}
                className="hidden"
              />
              {fileError && <p className="mt-2 text-sm font-medium text-destructive">{fileError}</p>}
            </div>
          </div>

          <div className="text-center pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full max-w-sm rounded-md bg-accent text-primary-foreground hover:bg-accent/90 text-lg h-12"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
