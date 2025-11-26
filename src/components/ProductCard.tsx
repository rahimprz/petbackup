"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { useCart } from "@components/Cart"
import { useToast } from "@components/ui/toast"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = async () => {
    try {
      await addItem(product)
      showToast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        variant: "success",
      })
    } catch (error) {
      // Error is already handled in addItem
    }
  }

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

  const hasCompare = typeof product.originalPrice === "number" && product.originalPrice > product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className="h-full"
      style={{ willChange: "transform" }}
    >
      <Link
        href={`/products/${product.id}`}
        className="h-full flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-card/80 to-secondary/30 border-2 border-secondary/50 hover:border-primary/50 transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-primary/30 backdrop-blur-sm relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        {/* Subtle glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
        {/* Image Section - Larger, more prominent */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/20 rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            style={{ willChange: "transform" }}
            unoptimized={product.image.includes('api.blox.pet')}
            onError={(e) => {
              console.error("[ProductCard] Image failed to load:", product.image)
              const target = e.target as HTMLImageElement
              target.src = "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge - Top Left */}
          <div className="absolute left-3 top-3 z-10">
            <div className="px-2.5 py-1 rounded-md bg-secondary/80 backdrop-blur-sm border border-secondary/50 text-[10px] sm:text-xs font-medium text-muted-foreground">
              PET
            </div>
          </div>

          {/* Rarity Badge - Top Right */}
          <div className="absolute right-3 top-3 z-10">
            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary via-blue-500 to-accent shadow-lg shadow-primary/30 border border-primary/40">
              <span className="text-[10px] sm:text-xs font-bold text-white">Mythical</span>
            </div>
          </div>

          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center rounded-t-2xl">
              <span className="text-lg font-semibold text-muted-foreground">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content Section - Darker background like the image */}
        <div className="flex-1 flex flex-col p-4 sm:p-5 bg-gradient-to-b from-secondary/40 to-secondary/30 rounded-b-2xl">
          {/* Product Name */}
          <h3 className="font-bold text-base sm:text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {formatPrice(product.price)}
            </div>
            {hasCompare && (
              <div className="text-sm sm:text-base text-muted-foreground line-through">
                {formatPrice(product.originalPrice!)}
              </div>
            )}
          </div>

          {/* Add Button - Blue theme matching site */}
          <Button
            onClick={(event) => {
              event.preventDefault()
              handleAddToCart()
            }}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-primary via-blue-500 to-accent hover:from-primary/90 hover:via-blue-600 hover:to-accent/90 text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group/btn"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
            <span className="text-sm sm:text-base">Add</span>
          </Button>
        </div>
      </Link>
    </motion.div>
  )
}

