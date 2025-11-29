"use client"

import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { addToCart } from "@lib/data/cart"
import { useToast } from "@components/ui/toast"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { countryCode } = useParams() as { countryCode: string }
  const { showToast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Get the first category for the badge
  const primaryCategory = product.categories?.[0]

  // Check stock status - properly handle manage_inventory and allow_backorder
  const isOutOfStock = !product.variants?.some((variant) => {
    // If we don't manage inventory, product is always available
    if (!variant.manage_inventory) {
      return true
    }

    // If we allow back orders, product is always available
    if (variant.allow_backorder) {
      return true
    }

    // If there is inventory available, product is available
    if (variant.manage_inventory && (variant.inventory_quantity || 0) > 0) {
      return true
    }

    // Otherwise, this variant is not available
    return false
  })

  // Get the first available variant for single-variant products
  const firstVariant = product.variants?.[0]

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!firstVariant?.id || isOutOfStock) return

    setIsAdding(true)

    const result = await addToCart({
      variantId: firstVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)

    if (result) {
      if (result.success) {
        showToast({
          title: "Success!",
          description: result.message,
          variant: "success",
          duration: 3000,
        })
      } else if (result.alreadyExists) {
        showToast({
          title: "Item Already in Cart",
          description: result.message,
          variant: "warning",
          duration: 4000,
        })
      } else {
        showToast({
          title: "Error",
          description: result.message,
          variant: "error",
          duration: 4000,
        })
      }
    }
  }

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <div
        data-testid="product-wrapper"
        className="flex flex-col h-full bg-secondary/20 backdrop-blur-sm border border-border/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 group-hover:bg-secondary/30"
      >
        {/* Image Container with Spotlight Effect */}
        <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
          {/* Radial spotlight behind image - using theme colors */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />

          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />

          {/* Category Badge - Top Left */}
          {primaryCategory && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-secondary/80 backdrop-blur-md border border-border/20 rounded-lg shadow-lg">
              <span className="text-[10px] font-bold text-foreground/80 uppercase tracking-wider">
                {primaryCategory.name}
              </span>
            </div>
          )}

          {/* Rarity/Secret Badge - Top Right */}
          {product.metadata?.rarity && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-primary/20 backdrop-blur-md border border-primary/20 rounded-lg shadow-lg">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {String(product.metadata.rarity)}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Product Title */}
          <h3
            className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300"
            data-testid="product-title"
          >
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-4">
            {cheapestPrice && (
              <>
                <span className="text-xl font-extrabold text-foreground tracking-tight">
                  {cheapestPrice.calculated_price}
                </span>
                {cheapestPrice.original_price && cheapestPrice.original_price !== cheapestPrice.calculated_price && (
                  <span className="text-sm text-muted-foreground line-through font-medium">
                    {cheapestPrice.original_price}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Action Button / Stock Status - Pushed to bottom */}
          <div className="mt-auto">
            {isOutOfStock ? (
              <button
                disabled
                className="w-full py-3 px-4 rounded-xl bg-secondary/50 border border-border/10 text-muted-foreground font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                Out Of Stock
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
