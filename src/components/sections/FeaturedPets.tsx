"use client"

import { motion } from "framer-motion"

export function FeaturedPets() {
  // This is a placeholder for the Best Sellers section
  // In a full implementation, this would fetch top-rated products from Medusa
  // For now, it shows a visual banner

  return (
    <section className="py-16 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-green-400 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              ⭐ BEST SELLERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top Rated <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Products</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection below to discover the most popular items
          </p>
        </motion.div>
      </div>
    </section>
  )
}
