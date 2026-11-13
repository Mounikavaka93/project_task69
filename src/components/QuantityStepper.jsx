export default function QuantityStepper({ qty, onChange, min = 1, max = 10 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full text-lg text-[#1d1d1f] transition hover:bg-black/5 disabled:opacity-30"
        onClick={() => onChange(qty - 1)}
        disabled={qty <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full text-lg text-[#1d1d1f] transition hover:bg-black/5 disabled:opacity-30"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
