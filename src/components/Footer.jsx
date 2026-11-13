import { Link } from "react-router-dom";
import { shop } from "../data/catalog";

const quick = [
  { to: "/", label: "Home" },
  { to: "/iphone", label: "iPhone" },
  { to: "/accessories", label: "Accessories" },
  { to: "/offers", label: "Offers" },
  { to: "/contact", label: "Contact" },
  { to: "/cart", label: "Bag" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="text-xs font-semibold tracking-wide text-[#1d1d1f] uppercase">Contact</h2>
          <p className="mt-4 text-sm leading-6 text-[#1d1d1f]">
            {shop.name}
            <br />
            {shop.street}
            <br />
            {shop.city}
          </p>
          <p className="mt-3 text-sm">
            <a className="hover:text-[#1d1d1f] hover:underline" href={shop.phoneHref}>
              {shop.phone}
            </a>
            <br />
            <a className="hover:text-[#1d1d1f] hover:underline" href={`mailto:${shop.email}`}>
              {shop.email}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wide text-[#1d1d1f] uppercase">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quick.map((link) => (
              <li key={link.to}>
                <Link className="hover:text-[#1d1d1f] hover:underline" to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold tracking-wide text-[#1d1d1f] uppercase">Follow Apple</h2>
          <div className="mt-4 flex gap-2">
            <Social href="https://x.com/apple" label="Apple on X">
              <path d="M5 5.5 10.2 12 5 18.5h1.7l4.2-5.2 3.4 5.2H19l-5.5-7.8L18.6 5.5H17l-3.9 4.8L10 5.5H5Z" fill="currentColor" />
            </Social>
            <Social href="https://www.instagram.com/apple/" label="Apple on Instagram">
              <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="16.2" cy="7.8" r="0.8" fill="currentColor" />
            </Social>
            <Social href="https://www.youtube.com/@apple" label="Apple on YouTube">
              <rect x="4" y="7" width="16" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 9.5v5l4.5-2.5L11 9.5Z" fill="currentColor" />
            </Social>
            <Social href="https://www.facebook.com/apple" label="Apple on Facebook">
              <path d="M13.2 18.5v-6h2l.3-2.2h-2.3V8.9c0-.6.2-1 1.1-1H15.7V5.8c-.3 0-1 0-1.8.2-1.7.4-2.8 1.5-2.8 3.2v1.1H9.2V12.5h1.9v6h2.1Z" fill="currentColor" />
            </Social>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-5">
            Those accounts belong to Apple. Osric is an independent demo shop and is not affiliated with Apple.
          </p>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Osric. iPhone is a trademark of Apple Inc.</p>
          <p>US prices before tax. Checkout in this demo does not take payment.</p>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#1d1d1f] ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:bg-[#1d1d1f] hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
