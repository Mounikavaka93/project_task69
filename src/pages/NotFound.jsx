import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { primaryBtn } from "../components/styles";

export default function NotFound() {
  useTitle("Page not found — Osric");
  return (
    <section className="mx-auto max-w-lg px-5 py-28 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">That page is not in the shop.</h1>
      <Link to="/" className={`${primaryBtn} mt-6`}>
        Back home
      </Link>
    </section>
  );
}
