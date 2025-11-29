"use client"

import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"
import { useState, useMemo } from "react"
import { Search } from "lucide-react"

import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  products,
  region,
  totalPages,
  count,
  categories,
}: {
  sortBy?: SortOptions
  page?: number
  countryCode: string
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  totalPages: number
  count: number
  categories: HttpTypes.StoreProductCategory[]
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const pageNumber = page || 1
  const sort = sortBy || "created_at"

  // Organize products by category
  const productsByCategory = useMemo(() => {
    const organized: Record<string, HttpTypes.StoreProduct[]> = {}

    products.forEach((product) => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach((cat) => {
          if (!organized[cat.id]) {
            organized[cat.id] = []
          }
          organized[cat.id].push(product)
        })
      }
    })

    return organized
  }, [products])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    return productsByCategory[selectedCategory] || []
  }, [selectedCategory, products, productsByCategory])

  return (
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div
        className="py-6 content-container relative z-10"
        data-testid="category-container"
      >
        <div className="w-full">
          {/* Search and Sort Bar */}
          <div className="flex items-center gap-4 mb-6 bg-secondary/20 border border-border/30 rounded-xl p-1">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-lg border border-border/50">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="text-sm font-medium text-foreground">Sort by:</span>
              <select className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer">
                <option value="best-sellers">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Category Selector */}
          <div className="mb-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {/* All Products Tab */}
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/30 hover:bg-secondary/50 text-foreground border border-border/30"
                  }`}
              >
                All Products
              </button>

              {/* Category Tabs */}
              {categories.map((category) => {
                const categoryProductCount = productsByCategory[category.id]?.length || 0
                if (categoryProductCount === 0) return null

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary/30 hover:bg-secondary/50 text-foreground border border-border/30"
                      }`}
                  >
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Category Header (for active category) */}
          {selectedCategory && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Suggest
              </button>
            </div>
          )}

          {/* All Products Header (when showing all) */}
          {!selectedCategory && (
            <h2 className="text-2xl font-bold text-foreground mb-6">
              All Products
            </h2>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 w-full small:grid-cols-4 medium:grid-cols-5 gap-6"
                data-testid="products-list"
              >
                {filteredProducts.map((product, index) => (
                  <motion.li
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <ProductPreview product={product} region={region} />
                  </motion.li>
                ))}
              </motion.ul>

              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-12"
                >
                  <Pagination
                    data-testid="product-pagination"
                    page={pageNumber}
                    totalPages={totalPages}
                  />
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-lg text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
