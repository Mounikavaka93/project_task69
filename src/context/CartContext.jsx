import { createContext, useContext, useEffect, useRef, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "osric-cart-v1";
const MAX_QTY = 10;

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && item.lineId && item.name && item.price)
      .map((item) => ({ ...item, qty: Number(item.qty) || 1, price: Number(item.price) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* Storage can fail in private mode. The bag still works for this visit. */
    }
  }, [items]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const notify = (message) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2600);
  };

  const addItem = (item) => {
    const qty = Math.max(1, item.qty || 1);
    const exists = items.some((line) => line.lineId === item.lineId);
    setItems((prev) => {
      const index = prev.findIndex((line) => line.lineId === item.lineId);
      if (index >= 0) {
        return prev.map((line, i) =>
          i === index ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) } : line,
        );
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, qty) }];
    });
    notify(exists ? `${item.name} quantity updated` : `${item.name} added to bag`);
  };

  const removeItem = (lineId) => {
    setItems((prev) => prev.filter((line) => line.lineId !== lineId));
  };

  const updateQty = (lineId, qty) => {
    setItems((prev) =>
      prev.map((line) =>
        line.lineId === lineId ? { ...line, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : line,
      ),
    );
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, line) => sum + line.qty, 0);
  const total = items.reduce((sum, line) => sum + line.price * line.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, total }}>
      {children}
      {toast ? (
        <div className="toast" role="status">
          {toast}
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used within CartProvider");
  return value;
}
