import { useState } from "react";
import { shop } from "../data/catalog";
import useTitle from "../hooks/useTitle";
import { fieldClass, primaryBtn } from "../components/styles";

const empty = { name: "", email: "", topic: "Order help", message: "" };

export default function Contact() {
  useTitle("Contact — Osric");
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.message.trim().length < 12) next.message = "Write at least a short note.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
      <div>
        <p className="text-sm font-medium text-[#0066cc]">Contact</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">Talk to the shop.</h1>
        <p className="mt-3 max-w-xl text-neutral-500">
          Ask about a model, a bag, or a visit. This form stays in the browser and is not sent to a server.
        </p>

        {sent ? (
          <div className="mt-8 rounded-3xl bg-[#f5f5f7] p-6" role="status">
            <h2 className="text-2xl font-semibold tracking-tight">Thanks, {form.name.trim()}.</h2>
            <p className="mt-2 text-neutral-600">
              Nothing was emailed. Call {shop.phone} if you need a person today.
            </p>
            <button
              type="button"
              className={`${primaryBtn} mt-5`}
              onClick={() => {
                setSent(false);
                setForm(empty);
              }}
            >
              Write another note
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
            <Field label="Name" error={errors.name}>
              <input className={fieldClass} value={form.name} onChange={update("name")} autoComplete="name" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input className={fieldClass} type="email" value={form.email} onChange={update("email")} autoComplete="email" />
            </Field>
            <Field label="Topic">
              <select className={fieldClass} value={form.topic} onChange={update("topic")}>
                <option>Order help</option>
                <option>Which iPhone</option>
                <option>Store visit</option>
                <option>Something else</option>
              </select>
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea className={`${fieldClass} min-h-36 resize-y`} value={form.message} onChange={update("message")} />
            </Field>
            <button type="submit" className={primaryBtn}>
              Send note
            </button>
          </form>
        )}
      </div>

      <aside className="h-fit rounded-[2rem] bg-[#1d1d1f] p-7 text-white">
        <h2 className="text-2xl font-semibold tracking-tight">{shop.name}</h2>
        <p className="mt-4 text-white/80">
          {shop.street}
          <br />
          {shop.city}
        </p>
        <p className="mt-4">
          <a className="hover:underline" href={shop.phoneHref}>
            {shop.phone}
          </a>
          <br />
          <a className="hover:underline" href={`mailto:${shop.email}`}>
            {shop.email}
          </a>
        </p>
        <dl className="mt-6 space-y-2 text-sm text-white/80">
          {shop.hours.map(([day, time]) => (
            <div key={day} className="flex justify-between gap-4">
              <dt>{day}</dt>
              <dd>{time}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-2 font-normal">{children}</div>
      {error ? <span className="mt-1 block text-sm font-normal text-red-600">{error}</span> : null}
    </label>
  );
}
