import { useState } from "react";
import { Link } from "react-router-dom";
import { FINANCE_MONTHS, formatPrice, phones, promos } from "../data/catalog";
import useTitle from "../hooks/useTitle";
import { fieldClass, primaryBtn } from "../components/styles";

export default function Offers() {
  useTitle("Offers — Osric");
  const [slug, setSlug] = useState(phones[0].slug);
  const phone = phones.find((item) => item.slug === slug) ?? phones[0];
  const [storageId, setStorageId] = useState(phone.storage[0].id);
  const [copied, setCopied] = useState("");

  const storage = phone.storage.find((item) => item.id === storageId) ?? phone.storage[0];
  const monthly = storage.price / FINANCE_MONTHS;

  const onModel = (value) => {
    const next = phones.find((item) => item.slug === value) ?? phones[0];
    setSlug(next.slug);
    setStorageId(next.storage[0].id);
  };

  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
    } catch {
      setCopied("");
    }
  };

  return (
    <div>
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-sm text-white/60">Offers</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Two shop codes. One example payment plan.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            These are Osric demo offers. They are not carrier deals, and this checkout does not charge a card.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2">
        {Object.entries(promos).map(([code, promo]) => (
          <article key={code} className="rounded-3xl bg-[#f5f5f7] p-6">
            <p className="text-sm text-neutral-500">{promo.label}</p>
            <p className="mt-2 font-mono text-3xl font-semibold tracking-tight">{code}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {code === "STUDENT"
                ? "Five percent off the bag. This demo does not check a student ID."
                : "Ten percent off phones and accessories in the bag. One code at a time."}
            </p>
            <button type="button" onClick={() => copy(code)} className={`${primaryBtn} mt-5`}>
              {copied === code ? "Copied" : "Copy code"}
            </button>
          </article>
        ))}
      </section>

      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Example monthly price</h2>
          <p className="mt-2 max-w-2xl text-neutral-500">
            Divide the US price by {FINANCE_MONTHS}. This is arithmetic, not a credit offer.
          </p>
          <form className="mt-8 grid gap-4 rounded-3xl bg-white p-6 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <label className="block text-sm">
              Model
              <select className={`${fieldClass} mt-2`} value={slug} onChange={(event) => onModel(event.target.value)}>
                {phones.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Storage
              <select
                className={`${fieldClass} mt-2`}
                value={storage.id}
                onChange={(event) => setStorageId(event.target.value)}
              >
                {phone.storage.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label} — {formatPrice(item.price)}
                  </option>
                ))}
              </select>
            </label>
            <div className="sm:col-span-2">
              <p className="text-4xl font-semibold tracking-tight">{formatPrice(monthly)}<span className="text-lg font-medium text-neutral-500">/mo.</span></p>
              <p className="mt-1 text-sm text-neutral-500">
                {formatPrice(storage.price)} over {FINANCE_MONTHS} months, before tax.
              </p>
              <Link to={`/iphone/${phone.slug}#configure`} className={`${primaryBtn} mt-5`}>
                Configure {phone.name}
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
