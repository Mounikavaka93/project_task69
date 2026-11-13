import AccessoryCard from "../components/AccessoryCard";
import useTitle from "../hooks/useTitle";
import { accessories } from "../data/catalog";

export default function Accessories() {
  useTitle("Accessories — Osric");
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-[#0066cc]">Accessories</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">Cases, cables, power.</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Osric prices for add-ons that work with the current iPhone lineup. Pick a color, then add it to the bag.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {accessories.map((item) => (
          <AccessoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
