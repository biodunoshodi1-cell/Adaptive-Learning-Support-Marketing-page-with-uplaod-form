function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

/**
 * Submits a set of values to Netlify Forms using the standard AJAX technique.
 * Netlify intercepts POSTs to "/" that contain a "form-name" field matching
 * a form it detected in the built static HTML (see the hidden forms in
 * index.html) and routes the submission to whatever notifications are
 * configured for that form (e.g. an email to info@adaptivelearningsupport.com).
 */
export async function submitNetlifyForm(
  formName: string,
  values: Record<string, string | undefined>,
): Promise<void> {
  const payload: Record<string, string> = { "form-name": formName };
  for (const [key, value] of Object.entries(values)) {
    payload[key] = value ?? "";
  }

  const res = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode(payload),
  });

  if (!res.ok) {
    throw new Error("Form submission failed");
  }
}

/**
 * Submits a set of values (including an optional file, e.g. a CV) to
 * Netlify Forms. File uploads require a multipart/form-data POST rather
 * than the urlencoded technique used by submitNetlifyForm above — Netlify
 * still matches it to the corresponding hidden form in index.html via the
 * "form-name" field and routes it to that form's configured notifications
 * (e.g. an email to info@adaptivelearningsupport.com).
 */
export async function submitNetlifyFormWithFile(
  formName: string,
  values: Record<string, string | undefined>,
  file: File,
  fileFieldName = "cv",
): Promise<void> {
  const formData = new FormData();
  formData.append("form-name", formName);
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value ?? "");
  }
  formData.append(fileFieldName, file, file.name);

  const res = await fetch("/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Form submission failed");
  }
}
