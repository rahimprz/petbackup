"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ProductGrid } from "./ProductGrid"
import { fetchProducts } from "@lib/medusa-api"
import { Product } from "@/types/product"

export function FeaturedPets() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await fetchProducts()
        // Get top-rated products as featured/best sellers
        // Show more products (8) so horizontal scrolling is useful
        const sorted = [...products]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8)
        setFeaturedProducts(sorted)
      } catch (error) {
        console.error("Failed to load featured products:", error)
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProducts()
  }, [])

  if (loading) {
    return null // Don't show anything while loading
  }

  if (featuredProducts.length === 0) {
    return null // Don't show section if no products
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
              BEST SELLERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Pets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular and highly-rated virtual pets
          </p>
        </motion.div>

        <ProductGrid
          products={featuredProducts}
          title="Featured Pets"
          showViewAll={false}
          showTitle={false}
          enableHorizontalScroll={true}
        />
      </div>
    </section>
  )
}


