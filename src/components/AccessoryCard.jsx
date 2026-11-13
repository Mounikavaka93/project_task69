import { useState } from "react";
import AccessoryVisual from "./AccessoryVisual";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/catalog";
import { primaryBtn } from "./styles";

export default function AccessoryCard({ item }) {
  const { addItem } = useCart();
  const [colorId, setColorId] = useState(item.colors[0].id);
  const finish = item.colors.find((color) => color.id === colorId) ?? item.colors[0];

  const add = () => {
    addItem({
      lineId: `acc|${item.id}|${finish.id}`,
      type: "accessory",
      name: item.name,
      price: item.price,
      qty: 1,
      color: finish.name,
      kind: item.kind,
      finish,
    });
  };

  return (
    <article id={item.id} className="scroll-target flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="grid h-52 place-items-center rounded-2xl bg-[#f5f5f7]">
        <AccessoryVisual kind={item.kind} finish={finish} className="w-28" label={`${item.name} in ${finish.name}`} />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.name}</h3>
      <p className="mt-1 text-sm text-neutral-500">{item.blurb}</p>
      <p className="mt-3 text-lg">{formatPrice(item.price)}</p>
      {item.colors.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={`${item.name} colors`}>
          {item.colors.map((color) => {
            const active = color.id === finish.id;
            return (
              <button
                key={color.id}
                type="button"
                aria-label={color.name}
                aria-pressed={active}
                onClick={() => setColorId(color.id)}
                className={`h-7 w-7 rounded-full ring-1 ring-black/10 ${active ? "outline outline-2 outline-offset-2 outline-[#0071e3]" : ""}`}
                style={{ background: `linear-gradient(145deg, ${color.highlight}, ${color.frame})` }}
              />
            );
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-neutral-500">{finish.name}</p>
      )}
      <div className="mt-auto pt-5">
        <button type="button" onClick={add} className={`${primaryBtn} w-full`}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
