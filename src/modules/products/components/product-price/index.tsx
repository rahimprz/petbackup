"use client"

import { clx } from "@medusajs/ui"
import { motion } from "framer-motion"
import { DollarSign, TrendingDown } from "lucide-react"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded-lg" />
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-y-3 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
    >
      {/* Price Label */}
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <DollarSign className="h-4 w-4" />
        <span>Price</span>
      </div>

      {/* Main Price */}
      <div className="flex items-baseline gap-2">
        {!variant && (
          <span className="text-sm text-muted-foreground">From</span>
        )}
        <span
          className={clx("text-3xl font-bold", {
            "text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent":
              selectedPrice.price_type === "sale",
            "text-foreground": selectedPrice.price_type !== "sale",
          })}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </div>

      {/* Sale Price Info */}
      {selectedPrice.price_type === "sale" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-2 pt-2 border-t border-border/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Original:</span>
              <span
                className="text-base line-through text-muted-foreground"
                data-testid="original-product-price"
                data-value={selectedPrice.original_price_number}
              >
                {selectedPrice.original_price}
              </span>
            </div>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold text-green-600">
                {selectedPrice.percentage_diff}% OFF
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
