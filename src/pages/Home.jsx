import { Link } from "react-router-dom";
import PhoneVisual from "../components/PhoneVisual";
import ProductCard from "../components/ProductCard";
import AccessoryCard from "../components/AccessoryCard";
import Reveal from "../components/Reveal";
import useTitle from "../hooks/useTitle";
import { accessories, phones } from "../data/catalog";
import { lightBtn } from "../components/styles";

const hero = phones[0];
const duo = phones[2];
const air = phones[3];

export default function Home() {
  useTitle("Osric — iPhone Store");
  const heroFinish = hero.colors[0];

  return (
    <div>
      <section className="relative overflow-hidden bg-black text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 35%, rgba(110,49,66,0.85), transparent 46%), radial-gradient(ellipse at 20% 80%, rgba(20,36,64,0.8), transparent 42%)",
          }}
        />
        <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="rise text-sm text-white/70">New</p>
            <h1 className="rise rise-2 mt-3 text-5xl font-semibold tracking-tight sm:text-7xl">iPhone 18 Pro</h1>
            <p className="rise rise-3 mx-auto mt-4 max-w-md text-xl text-white/80 md:mx-0">
              Burgundy, Glacier, Silver, and Black. A20 Pro. Up to 36 hours of video playback.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              <Link to="/iphone/iphone-18-pro#configure" className={lightBtn}>
                Buy
              </Link>
              <Link to="/iphone/iphone-18-pro" className="text-sm font-medium text-[#2997ff] hover:underline">
                Explore more
              </Link>
            </div>
            <dl className="rise rise-3 mx-auto mt-12 grid max-w-md grid-cols-3 gap-3 border-t border-white/15 pt-6 text-left md:mx-0">
              <Stat value="A20 Pro" label="6-core CPU" />
              <Stat value="36 hrs" label="Video playback" />
              <Stat value="48MP" label="Three cameras" />
            </dl>
          </div>
          <div className="floaty grid place-items-center">
            <PhoneVisual
              finish={heroFinish}
              variant={hero.variant}
              view="angle"
              className="w-52 sm:w-64"
              label="iPhone 18 Pro in Burgundy"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0c1220] text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-6 md:grid-cols-2">
          <Reveal>
            <p className="text-sm text-white/70">Foldable</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">iPhone Duo</h2>
            <p className="mt-4 max-w-md text-lg text-white/80">
              A 7.6-inch inner display that closes to 11.3 mm. Night Sky and Star White. From $1,999.
            </p>
            <div className="mt-8 flex gap-5">
              <Link to="/iphone/iphone-duo#configure" className={lightBtn}>
                Buy
              </Link>
              <Link to="/iphone/iphone-duo" className="self-center text-sm font-medium text-[#2997ff] hover:underline">
                Explore more
              </Link>
            </div>
          </Reveal>
          <Reveal className="relative grid place-items-center" delay={80}>
            <div className="absolute h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <PhoneVisual
              finish={duo.colors[1]}
              variant="duo"
              view="front"
              className="relative w-56 sm:w-64"
              label="iPhone Duo in Star White"
            />
          </Reveal>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <Link to="/iphone/iphone-air" className="gutter-left group flex h-full flex-col bg-[#e7f1f8] py-16 text-[#1d1d1f] sm:py-20">
          <p className="text-sm text-[#0066cc]">Thin</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">iPhone Air</h2>
          <p className="mt-3 max-w-sm text-neutral-600">6.5-inch ProMotion display. A19 Pro. From $1,099.</p>
          <div className="mt-auto grid place-items-center pt-10">
            <PhoneVisual
              finish={air.colors[0]}
              variant="air"
              view="front"
              className="w-40 transition duration-700 group-hover:scale-105"
              label="iPhone Air in Sky Blue"
            />
          </div>
        </Link>
        <Link to="/offers" className="gutter-right group flex h-full flex-col bg-[#1d1d1f] py-16 text-white sm:py-20">
          <p className="text-sm text-white/60">This month</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">10% off the bag.</h2>
          <p className="mt-3 max-w-sm text-white/70">Use code OSRIC10 at checkout. Students can use STUDENT for 5% off.</p>
          <p className="mt-8 text-sm font-medium text-[#2997ff]">See offers</p>
        </Link>
      </section>

      <section className="bg-[#f5f5f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <Reveal>
            <p className="text-sm font-medium text-[#0066cc]">Shop</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Which iPhone is yours?</h2>
            <p className="mt-3 max-w-xl text-neutral-500">
              Seven current models. Prices shown are US starting prices before tax.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {phones.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Link to="/iphone" className="text-sm font-medium text-[#0066cc] hover:underline">
              Shop all iPhone models
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Add-ons for the phone you pick.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {accessories.slice(0, 3).map((item) => (
            <AccessoryCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <dt className="text-sm font-semibold sm:text-base">{value}</dt>
      <dd className="mt-1 text-xs text-white/60 sm:text-sm">{label}</dd>
    </div>
  );
}
