import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccessoryVisual from "../components/AccessoryVisual";
import PhoneVisual from "../components/PhoneVisual";
import QuantityStepper from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { formatPrice, promos } from "../data/catalog";
import useTitle from "../hooks/useTitle";
import { fieldClass, ghostBtn, primaryBtn } from "../components/styles";

export default function Cart() {
  useTitle("Bag — Osric");
  const { items, updateQty, removeItem, clear, total } = useCart();
  const [draft, setDraft] = useState("");
  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const promo = promos[code];
  const discount = promo ? Math.round(total * promo.rate * 100) / 100 : 0;
  const due = Math.round((total - discount) * 100) / 100;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const applyCode = (event) => {
    event.preventDefault();
    const key = draft.trim().toUpperCase();
    if (!promos[key]) {
      setCode("");
      setPromoError("That code is not active.");
      return;
    }
    setCode(key);
    setPromoError("");
  };

  const setField = (key) => (event) => {
    const value = event.target.value;
    setBuyer((current) => ({
      ...current,
      [key]: key === "cardNumber" ? formatCard(value) : key === "expiry" ? formatExpiry(value) : key === "cvv" ? value.replace(/\D/g, "").slice(0, 4) : value,
    }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const digits = buyer.cardNumber.replace(/\D/g, "");
    const next = {};
    if (buyer.name.trim().length < 2) next.name = "Enter the name for this order.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) next.email = "Enter a valid email.";
    if (buyer.cardName.trim().length < 2) next.cardName = "Enter the name on the card.";
    if (digits.length < 13 || digits.length > 19 || !luhn(digits)) next.cardNumber = "Enter a valid card number.";
    if (!validExpiry(buyer.expiry)) next.expiry = "Enter a future expiry as MM/YY.";
    if (!/^\d{3,4}$/.test(buyer.cvv)) next.cvv = "Enter the 3- or 4-digit security code.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const orderId = `OS-${Date.now().toString().slice(-8)}`;
    setPlaced({ orderId, email: buyer.email.trim(), due, last4: digits.slice(-4) });
    setBuyer((current) => ({ ...current, cardNumber: "", cvv: "" }));
    setOpen(false);
    clear();
    setCode("");
  };

  if (placed) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <p className="text-sm font-medium text-[#0066cc]">Order {placed.orderId}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">You’re checked out.</h1>
        <p className="mt-3 text-neutral-600">
          A confirmation would go to {placed.email}. Paid with the card ending {placed.last4}. The demo total was {formatPrice(placed.due)}. The card was not sent to a bank.
        </p>
        <Link to="/iphone" className={`${primaryBtn} mt-6`}>
          Keep browsing
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <div className="grid place-items-center">
          <PhoneVisual
            finish={{
              id: "silver",
              name: "Silver",
              highlight: "#fff",
              frame: "#d8d8de",
              shadow: "#8e8e93",
              back: "#e8e8ed",
              wallpaper: ["#f5f5f7", "#c5ced8", "#eef2f6"],
              darkText: true,
            }}
            variant="pro"
            className="w-28"
          />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Your bag is empty.</h1>
        <p className="mt-2 text-neutral-500">Add an iPhone or an accessory to see it here.</p>
        <Link to="/iphone" className={`${primaryBtn} mt-6`}>
          Shop iPhone
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Bag</h1>
        <ul className="mt-6">
          {items.map((item) => (
            <li key={item.lineId} className="flex gap-4 border-b border-black/10 py-6">
              <div className="grid w-16 shrink-0 place-items-center">
                {item.type === "accessory" ? (
                  <AccessoryVisual kind={item.kind} finish={item.finish} className="w-14" />
                ) : (
                  <PhoneVisual finish={item.finish} variant={item.variant} view="front" className="w-12" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-neutral-500">
                      {item.color}
                      {item.storage ? ` · ${item.storage}` : ""}
                    </p>
                  </div>
                  <p className="font-medium tabular-nums">{formatPrice(item.price * item.qty)}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <QuantityStepper qty={item.qty} onChange={(qty) => updateQty(item.lineId, qty)} />
                  <button type="button" onClick={() => removeItem(item.lineId)} className="text-sm text-[#0066cc] hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-3xl bg-[#f5f5f7] p-6 lg:sticky lg:top-28">
        <h2 className="text-lg font-semibold">Summary</h2>
        <form onSubmit={applyCode} className="mt-4 flex gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Promo code"
            aria-label="Promo code"
            className={`${fieldClass} h-11`}
          />
          <button type="submit" className={ghostBtn}>
            Apply
          </button>
        </form>
        {promoError ? <p className="mt-2 text-sm text-red-600">{promoError}</p> : null}
        {promo ? (
          <p className="mt-3 flex items-center justify-between text-sm">
            <span>
              {code} · {promo.label}
            </span>
            <button
              type="button"
              className="text-[#0066cc] hover:underline"
              onClick={() => {
                setCode("");
                setDraft("");
              }}
            >
              Remove
            </button>
          </p>
        ) : null}
        <dl className="mt-5 space-y-2 text-sm">
          <Row label="Subtotal" value={formatPrice(total)} />
          {discount > 0 ? <Row label="Offer" value={`−${formatPrice(discount)}`} /> : null}
        </dl>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
          <p>Total</p>
          <p data-testid="cart-total">{formatPrice(due)}</p>
        </div>
        <p className="mt-2 text-xs text-neutral-500">Tax is not collected in this demo. Delivery is included. Payment details are requested at checkout.</p>
        <button type="button" className={`${primaryBtn} mt-5 w-full`} data-testid="checkout" onClick={() => setOpen(true)} disabled={!items.length}>
          Checkout
        </button>
        <Link to="/iphone" className="mt-4 block text-center text-sm text-[#0066cc] hover:underline">
          Continue shopping
        </Link>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4" role="presentation" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="max-h-[min(92vh,760px)] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <form onSubmit={placeOrder}>
                <h2 id="checkout-title" className="text-2xl font-semibold tracking-tight">
                  Checkout
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  Due today: {formatPrice(due)}. Enter payment details to place the order. This demo does not send the card to a bank.
                </p>
                <Field label="Name" error={errors.name}>
                  <input autoFocus className={fieldClass} value={buyer.name} autoComplete="name" onChange={setField("name")} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" className={fieldClass} value={buyer.email} autoComplete="email" onChange={setField("email")} />
                </Field>
                <h3 className="mt-6 text-sm font-semibold tracking-wide text-neutral-500 uppercase">Payment</h3>
                <Field label="Name on card" error={errors.cardName}>
                  <input className={fieldClass} value={buyer.cardName} autoComplete="cc-name" onChange={setField("cardName")} />
                </Field>
                <Field label="Card number" error={errors.cardNumber}>
                  <input
                    className={fieldClass}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    value={buyer.cardNumber}
                    onChange={setField("cardNumber")}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" error={errors.expiry}>
                    <input
                      className={fieldClass}
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      value={buyer.expiry}
                      onChange={setField("expiry")}
                    />
                  </Field>
                  <Field label="Security code" error={errors.cvv}>
                    <input
                      className={fieldClass}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      value={buyer.cvv}
                      onChange={setField("cvv")}
                    />
                  </Field>
                </div>
                <div className="mt-6 flex gap-3">
                  <button type="submit" className={`${primaryBtn} flex-1`}>
                    Place order
                  </button>
                  <button type="button" className={ghostBtn} onClick={() => setOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="mt-4 block text-sm font-medium">
      {label}
      <div className="mt-2 font-normal">{children}</div>
      {error ? <span className="mt-1 block font-normal text-red-600">{error}</span> : null}
    </label>
  );
}

function formatCard(value) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function luhn(number) {
  let sum = 0;
  let alternate = false;
  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

function validExpiry(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const ends = new Date(year, month, 0, 23, 59, 59);
  return ends >= new Date();
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
