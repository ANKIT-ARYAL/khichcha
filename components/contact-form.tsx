"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";

const schema = z.object({ name: z.string().trim().min(2, "Please enter your name.").max(80), email: z.string().trim().email("Please enter a valid email address.").max(160), message: z.string().trim().min(10, "Please include a little more detail.").max(4000) });

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setStatus("");
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const parsed = schema.safeParse({ name: form.get("name"), email: form.get("email"), message: form.get("message") });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Please check the form."); return; }
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
    if (!response.ok) { const body = await response.json().catch(() => ({})); setError(body.error || "Unable to send your message."); return; }
    formEl.reset(); setStatus("Thanks. Your message has been sent.");
  }
  return <form className="contact-form" onSubmit={submit}><div className="contact-form__heading"><span className="eyebrow">Get in touch</span><h2>Send us a note.</h2><p>We’ll get back to you soon.</p></div><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Message<textarea name="message" rows={6} required /></label>{error && <p className="form-feedback form-feedback--error" role="alert">{error}</p>}{status && <p className="form-feedback" role="status">{status}</p>}<button className="button" type="submit">Send message</button></form>;
}
