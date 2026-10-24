interface ApplicationValues {
  name: string;
  email: string;
  phone?: string;
  position: string;
  message?: string;
}

/**
 * Sends the LSA job application (including the CV file) to
 * info@adaptivelearningsupport.com as a real email attachment, via a
 * Netlify serverless function backed by Resend. This is separate from
 * Netlify Forms, which can only ever deliver a download link, not an
 * attachment.
 */
export async function sendApplicationWithAttachment(
  values: ApplicationValues,
  file: File,
): Promise<void> {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("email", values.email);
  formData.append("phone", values.phone ?? "");
  formData.append("position", values.position);
  formData.append("message", values.message ?? "");
  formData.append("cv", file, file.name);

  const res = await fetch("/.netlify/functions/send-application", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to send application email");
  }
}
