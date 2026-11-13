import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import useTitle from "../hooks/useTitle";
import { formatPrice, phones, startingPrice } from "../data/catalog";

const filters = [
  { id: "all", label: "All" },
  { id: "pro", label: "Pro" },
  { id: "fold", label: "Foldable" },
  { id: "air", label: "Air" },
  { id: "everyday", label: "Everyday" },
];

export default function IPhone() {
  useTitle("iPhone — Osric");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const shown = useMemo(() => {
    const list = phones.filter((phone) => {
      const matchesFilter = filter === "all" || phone.category === filter;
      const matchesQuery = phone.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
    if (sort === "low") list.sort((a, b) => startingPrice(a) - startingPrice(b));
    if (sort === "high") list.sort((a, b) => startingPrice(b) - startingPrice(a));
    return list;
  }, [filter, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-[#0066cc]">iPhone</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">Find a model.</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Names, prices, and the specs that separate them. Hover a card to see the back.
      </p>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter models">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`h-11 rounded-full px-4 text-sm transition ${
                  active ? "bg-[#1d1d1f] text-white" : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search models"
            aria-label="Search models"
            className="h-11 w-full rounded-full border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 sm:w-56"
          />
          <select
            value={sort}
            aria-label="Sort models"
            onChange={(event) => setSort(event.target.value)}
            className="h-11 w-full rounded-full border border-black/10 bg-white px-4 text-sm outline-none focus:border-[#0071e3] sm:w-52"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">No models match that search.</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}

      <div className="scroll-x mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Compare at a glance</h2>
        <table className="mt-4 w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-neutral-500">
              <th className="border-b border-black/10 py-3 pr-4 font-medium">Model</th>
              <th className="border-b border-black/10 py-3 pr-4 font-medium">Display</th>
              <th className="border-b border-black/10 py-3 pr-4 font-medium">Chip</th>
              <th className="border-b border-black/10 py-3 pr-4 font-medium">Camera</th>
              <th className="border-b border-black/10 py-3 font-medium">From</th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <tr key={phone.slug}>
                <th scope="row" className="border-b border-black/5 py-3 pr-4 font-medium">
                  {phone.name}
                </th>
                <td className="border-b border-black/5 py-3 pr-4">{phone.specs[0].value}</td>
                <td className="border-b border-black/5 py-3 pr-4">{phone.specs[1].value}</td>
                <td className="border-b border-black/5 py-3 pr-4">{phone.specs[2].value}</td>
                <td className="border-b border-black/5 py-3">{formatPrice(startingPrice(phone))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
