import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchProducts = async (params = {}) => {
    setLoading(true)
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(`${API_BASE}/products${qs ? `?${qs}` : ''}`)
    const data = await res.json()
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const onSearch = (q) => {
    setQuery(q)
    fetchProducts({ q, category })
  }

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [products])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={onSearch} />
      <Hero />

      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <div className="flex items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  const cat = c === 'All' ? '' : c
                  setCategory(cat)
                  fetchProducts({ q: query, category: cat })
                }}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  (c === 'All' && !category) || c === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => {}} />
            ))}
          </div>
        )}
      </div>

      <footer className="border-t py-8 text-center text-sm text-gray-500 bg-white">
        © {new Date().getFullYear()} MarketHub — A demo multi‑vendor marketplace
      </footer>
    </div>
  )
}

export default App
