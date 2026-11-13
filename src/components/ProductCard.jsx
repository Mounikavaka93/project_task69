import { Link } from "react-router-dom";
import { formatPrice, startingPrice } from "../data/catalog";
import PhoneVisual from "./PhoneVisual";
import { ghostBtn, primaryBtn } from "./styles";

export default function ProductCard({ product }) {
  const finish = product.colors[0];
  return (
    <article className="group flex h-full flex-col rounded-3xl bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
      <div className="relative h-72 overflow-hidden rounded-2xl bg-[#f5f5f7]">
        {product.badge ? (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1d1d1f] px-2.5 py-1 text-[11px] font-medium text-white">
            {product.badge}
          </span>
        ) : null}
        <div className="absolute inset-0 grid place-items-center transition duration-500 group-hover:opacity-0">
          <PhoneVisual finish={finish} variant={product.variant} view="front" className="w-32" />
        </div>
        <div className="absolute inset-0 grid place-items-center opacity-0 transition duration-500 group-hover:opacity-100">
          <PhoneVisual finish={finish} variant={product.variant} view="back" className="w-32" />
        </div>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">
        <Link to={`/iphone/${product.slug}`} className="hover:underline">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-neutral-500">{product.tagline}</p>
      <p className="mt-3 text-lg">From {formatPrice(startingPrice(product))}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {product.highlights.map((item) => (
          <li key={item} className="rounded-full bg-[#f5f5f7] px-2.5 py-1 text-xs text-neutral-600">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
        <Link to={`/iphone/${product.slug}`} className={`${ghostBtn} card-action`}>
          Explore More
        </Link>
        <Link to={`/iphone/${product.slug}#configure`} className={`${primaryBtn} card-action`}>
          Buy Now
        </Link>
      </div>
    </article>
  );
}
