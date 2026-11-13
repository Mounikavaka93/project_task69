import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/iphone", label: "iPhone" },
  { to: "/accessories", label: "Accessories" },
  { to: "/offers", label: "Offers" },
  { to: "/contact", label: "Contact" },
];

function linkClass(isActive, mobile = false) {
  if (mobile) {
    return `block border-b border-white/10 py-4 text-3xl font-semibold tracking-tight ${
      isActive ? "text-white" : "text-white/75"
    }`;
  }
  return `text-[13px] transition ${isActive ? "text-white" : "text-white/70 hover:text-white"}`;
}

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(84);
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const [openPath, setOpenPath] = useState(pathname);
  if (openPath !== pathname) {
    setOpenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="bg-[#f5f5f7] text-center text-[13px] text-[#1d1d1f]">
        <Link to="/iphone/iphone-18-pro" className="inline-flex min-h-9 items-center px-4 hover:underline">
          Now in the shop: iPhone 18 Pro
        </Link>
      </div>
      <div className="border-b border-white/10 bg-[#161617]/92 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="text-[15px] font-semibold tracking-tight" aria-label="Osric home">
            Osric
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => linkClass(isActive)}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <Link
              to="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-white/10"
              aria-label={count ? `Bag, ${count} items` : "Bag"}
            >
              <BagIcon />
              {count > 0 ? (
                <span className="absolute top-1 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuTop(headerRef.current?.getBoundingClientRect().height ?? 84);
                setOpen((value) => !value);
              }}
            >
              <span className="flex w-5 flex-col gap-1.5">
                <span className={`h-0.5 bg-white transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`h-0.5 bg-white transition ${open ? "opacity-0" : ""}`} />
                <span className={`h-0.5 bg-white transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-menu"
          style={{ top: menuTop }}
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-[#161617] px-6 md:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)} className={({ isActive }) => linkClass(isActive, true)}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" onClick={() => setOpen(false)} className="block py-4 text-3xl font-semibold tracking-tight text-white/75">
            Bag{count > 0 ? ` (${count})` : ""}
          </NavLink>
        </nav>
      ) : null}
    </header>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 8h11l-.8 11.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 8Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
