"use client";

import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRef, useState, type FormEvent } from "react";
import { projectTypes, validateContact, type ContactField } from "@/lib/contact-schema";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappTap } from "@/components/ui/WhatsappTap";
import { site } from "@content/site";
import { tr } from "@content/types";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-bg-elevated px-4 py-3 text-base text-fg placeholder:text-muted/60 sm:text-sm transition-colors focus:border-cyan focus:outline-none aria-[invalid=true]:border-[#ff6b6b]";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-[#ff6b6b]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tA11y = useTranslations("a11y");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  // Heure d'affichage : un envoi en moins de 3 s est considéré comme un robot
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const parsed = validateContact(data);
    if (!parsed.ok) {
      setErrors(Object.fromEntries(parsed.errors.map((field) => [field, t(`errors.${field}`)])));
      form.querySelector<HTMLElement>(`[name="${parsed.errors[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: data.company ?? "",
          elapsed: startedAt.current ? Date.now() - startedAt.current : 0,
          locale,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (field: ContactField) => (errors[field] ? `cf-${field}-error` : undefined);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onFocus={() => {
        if (!startedAt.current) startedAt.current = Date.now();
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-name" label={t("name")} error={errors.name}>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={inputClass}
          />
        </Field>
        <Field id="cf-contact" label={t("contact")} error={errors.contact}>
          <input
            id="cf-contact"
            name="contact"
            autoComplete="email"
            placeholder={t("contactPlaceholder")}
            aria-invalid={!!errors.contact}
            aria-describedby={describedBy("contact")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="cf-type" label={t("type")} error={errors.type}>
        <select
          id="cf-type"
          name="type"
          defaultValue="showcase"
          aria-invalid={!!errors.type}
          aria-describedby={describedBy("type")}
          className={inputClass}
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {t(`types.${type}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field id="cf-message" label={t("message")} error={errors.message}>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Piège à robots : invisible pour les humains */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="company">{t("honeypot")}</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-violet px-5 py-3 sm:w-auto sm:self-start text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
              {t("sending")}
            </>
          ) : (
            <>
              {t("submit")}
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>

        <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted sm:mt-0">
          {t("reachMe")}
          <WhatsappTap
            href={whatsappLink(site.whatsapp, tr(site.whatsappMessage, locale))}
            label={`WhatsApp ${tA11y("newTab")}`}
            hint={t("tapHint")}
            watch={formRef}
          />
        </p>

        <p role="status" aria-live="polite" className="text-sm sm:basis-full">
          {status === "success" && (
            <span className="inline-flex items-start gap-2 text-whatsapp">
              <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("success")}
            </span>
          )}
          {status === "error" && (
            <span className="inline-flex items-start gap-2 text-[#ff6b6b]">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t("error")}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
