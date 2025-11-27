import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Text } from "@medusajs/ui"

export async function FeaturedPets({ countryCode }: { countryCode: string }) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 4,
    },
  })

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              ⭐ BEST SELLERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Best <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Sellers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection below to discover the most popular items
          </p>
        </div>

        {products && products.length > 0 ? (
          <ul className="grid grid-cols-2 small:grid-cols-4 gap-x-6 gap-y-8">
            {products.map((product) => (
              <li key={product.id}>
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </section>
  )
}
