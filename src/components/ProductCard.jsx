export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      {product.images?.[0] ? (
        <img src={product.images[0]} alt={product.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-blue-50 to-purple-50" />
      )}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[36px]">{product.description || ""}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={() => onAdd?.(product)}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
