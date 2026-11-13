import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhoneVisual from "../components/PhoneVisual";
import ProductCard from "../components/ProductCard";
import QuantityStepper from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { FINANCE_MONTHS, formatPrice, getPhone, phones } from "../data/catalog";
import useTitle from "../hooks/useTitle";
import { primaryBtn, textLink } from "../components/styles";

const views = [
  { id: "front", label: "Front" },
  { id: "angle", label: "Angle" },
  { id: "back", label: "Back" },
];

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getPhone(slug);
  useTitle(product ? `${product.name} — Osric` : "Not found — Osric");

  const [colorId, setColorId] = useState(product?.colors[0].id ?? "");
  const [storageId, setStorageId] = useState(product?.storage[0].id ?? "");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState("front");
  const [seenSlug, setSeenSlug] = useState(slug);

  if (slug !== seenSlug) {
    setSeenSlug(slug);
    setColorId(product?.colors[0].id ?? "");
    setStorageId(product?.storage[0].id ?? "");
    setQty(1);
    setView("front");
  }

  const { addItem } = useCart();

  if (!product) {
    return (
      <section className="mx-auto max-w-lg px-5 py-28 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">That iPhone is not in the shop.</h1>
        <Link to="/iphone" className={`${textLink} mt-4 inline-block`}>
          Browse iPhone
        </Link>
      </section>
    );
  }

  const finish = product.colors.find((color) => color.id === colorId) ?? product.colors[0];
  const storage = product.storage.find((option) => option.id === storageId) ?? product.storage[0];
  const index = phones.findIndex((phone) => phone.slug === product.slug);
  const related = [1, 2, 3].map((step) => phones[(index + step) % phones.length]);

  const add = () => {
    addItem({
      lineId: `${product.slug}|${storage.id}|${finish.id}`,
      type: "phone",
      name: product.name,
      price: storage.price,
      qty,
      color: finish.name,
      storage: storage.label,
      finish,
      variant: product.variant,
    });
  };

  return (
    <div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-2 lg:items-start lg:py-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[2rem] bg-[#f5f5f7] px-6 py-10">
            <div key={`${finish.id}-${view}`} className="pop-in grid min-h-[420px] place-items-center">
              <PhoneVisual
                finish={finish}
                variant={product.variant}
                view={view}
                className="w-56 sm:w-64"
                label={`${product.name}, ${finish.name}, ${view} view`}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-3" role="group" aria-label="Product views">
            {views.map((item) => {
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setView(item.id)}
                  className={`overflow-hidden rounded-2xl px-3 py-2 transition ${active ? "bg-[#f5f5f7] ring-2 ring-[#0071e3]" : "hover:bg-[#f5f5f7]"}`}
                >
                  <PhoneVisual finish={finish} variant={product.variant} view={item.id} className="w-12" />
                  <span className="mt-1 block text-center text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="configure">
          {product.badge ? (
            <p className="text-sm font-medium text-[#0066cc]">{product.badge}</p>
          ) : null}
          <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-neutral-500">{product.tagline}</p>
          <p className="mt-6 text-3xl font-semibold tracking-tight">{formatPrice(storage.price)}</p>
          <p className="mt-1 text-sm text-neutral-500">
            or {formatPrice(storage.price / FINANCE_MONTHS)}/mo. for {FINANCE_MONTHS} months. Example only, before tax.
          </p>
          {product.priceNote ? <p className="mt-2 text-sm text-neutral-500">{product.priceNote}</p> : null}
          <p className="mt-5 max-w-xl leading-7 text-neutral-700">{product.summary}</p>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">Model</legend>
            <div className="scroll-x mt-3 flex gap-2 pb-1">
              {phones.map((phone) => {
                const active = phone.slug === product.slug;
                return (
                  <Link
                    key={phone.slug}
                    to={`/iphone/${phone.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
                      active ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] hover:bg-[#e8e8ed]"
                    }`}
                  >
                    {phone.name.replace("iPhone ", "")}
                  </Link>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">
              Finish — <span aria-live="polite">{finish.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const active = color.id === finish.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={color.name}
                    aria-pressed={active}
                    onClick={() => setColorId(color.id)}
                    className={`h-9 w-9 rounded-full ring-1 ring-black/15 transition hover:scale-105 ${
                      active ? "outline outline-2 outline-offset-2 outline-[#0071e3]" : ""
                    }`}
                    style={{ background: `linear-gradient(145deg, ${color.highlight}, ${color.shadow})` }}
                  />
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium">Storage</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {product.storage.map((option) => {
                const active = option.id === storage.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStorageId(option.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active ? "border-[#0071e3] ring-1 ring-[#0071e3]" : "border-black/10 hover:border-black/30"
                    }`}
                  >
                    <span className="block text-sm font-medium">{option.label}</span>
                    <span className="block text-sm text-neutral-500">{formatPrice(option.price)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper qty={qty} onChange={setQty} />
            <button type="button" onClick={add} className={`${primaryBtn} min-w-40`} data-testid="add-to-cart">
              Add to Cart
            </button>
            <Link to="/cart" className={textLink}>
              View bag
            </Link>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-black/10 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="bg-white px-4 py-4">
                <dt className="text-xs text-neutral-500">{spec.label}</dt>
                <dd className="mt-1 text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">You may also like</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((phone) => (
              <ProductCard key={phone.slug} product={phone} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
