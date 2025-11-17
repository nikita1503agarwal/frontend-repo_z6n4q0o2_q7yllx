import { ShoppingCart, Store, Search, User } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState("");
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Store className="h-6 w-6" />
          <span>MarketHub</span>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch?.(q)}
              className="w-full rounded-md border px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search products"
            />
          </div>
          <button onClick={() => onSearch?.(q)} className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md">
            Search
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full px-1">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
