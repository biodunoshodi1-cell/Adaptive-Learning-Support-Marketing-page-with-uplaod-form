import type { Handler, HandlerEvent } from "@netlify/functions";
import Busboy from "busboy";

const TO_EMAIL = "info@adaptivelearningsupport.com";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB — matches the frontend's own limit

interface ParsedForm {
  fields: Record<string, string>;
  file?: {
    filename: string;
    contentType: string;
    buffer: Buffer;
  };
}

function parseMultipartForm(event: HandlerEvent): Promise<ParsedForm> {
  return new Promise((resolve, reject) => {
    const contentType = event.headers["content-type"] || event.headers["Content-Type"];
    if (!contentType) {
      reject(new Error("Missing content-type header"));
      return;
    }

    const busboy = Busboy({
      headers: { "content-type": contentType },
      limits: { fileSize: MAX_FILE_SIZE_BYTES, files: 1 },
    });

    const fields: Record<string, string> = {};
    let file: ParsedForm["file"];
    let fileTooLarge = false;

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (_name, stream, info) => {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("limit", () => {
        fileTooLarge = true;
      });
      stream.on("end", () => {
        if (!fileTooLarge) {
          file = {
            filename: info.filename,
            contentType: info.mimeType,
            buffer: Buffer.concat(chunks),
          };
        }
      });
    });

    busboy.on("error", (err) => reject(err));

    busboy.on("finish", () => {
      if (fileTooLarge) {
        reject(new Error("File too large"));
        return;
      }
      resolve({ fields, file });
    });

    const bodyBuffer = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64")
      : Buffer.from(event.body || "", "utf8");

    busboy.end(bodyBuffer);
  });
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("send-application: RESEND_API_KEY environment variable is not set");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email service is not configured" }),
    };
  }

  let parsed: ParsedForm;
  try {
    parsed = await parseMultipartForm(event);
  } catch (err) {
    console.error("send-application: failed to parse submission", err);
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid submission" }) };
  }

  const { fields, file } = parsed;

  if (!file) {
    return { statusCode: 400, body: JSON.stringify({ error: "CV file is required" }) };
  }

  const name = fields.name || "";
  const email = fields.email || "";
  const phone = fields.phone || "";
  const position = fields.position || "";
  const message = fields.message || "";

  if (!name || !email || !position) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const html = `
    <h2>New LSA Job Application</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
    <p><strong>Role applying for:</strong> ${escapeHtml(position)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message || "None provided").replace(/\n/g, "<br/>")}</p>
    <p><em>CV attached: ${escapeHtml(file.filename)}</em></p>
  `;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Adaptive Learning Support <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `LSA Application: ${name}`,
        html,
        attachments: [
          {
            filename: file.filename,
            content: file.buffer.toString("base64"),
          },
        ],
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("send-application: Resend API error", resendRes.status, errText);
      return { statusCode: 502, body: JSON.stringify({ error: "Failed to send email" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("send-application: unexpected error", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Unexpected error" }) };
  }
};
