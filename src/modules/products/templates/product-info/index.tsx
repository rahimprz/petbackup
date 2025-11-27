"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { motion } from "framer-motion"
import { Package, Tag, Sparkles } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <motion.div
      id="product-info"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col gap-y-4 lg:max-w-[500px]">
        {/* Top Badges */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25"
          >
            SECRET
          </motion.div>

          {product.collection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground text-xs font-medium uppercase tracking-wider"
            >
              {product.collection.title}
            </motion.div>
          )}
        </div>

        {/* Product Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Heading
            level="h1"
            className="text-4xl md:text-5xl leading-tight text-foreground font-bold tracking-tight"
            data-testid="product-title"
          >
            {product.title}
          </Heading>
        </motion.div>

        {/* Type Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-muted-foreground font-medium"
        >
          Type: <span className="text-foreground uppercase">{product.type?.value || "PLANT"}</span>
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-2 mt-2"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500 text-white font-bold text-sm shadow-lg shadow-green-500/20">
            <Sparkles className="h-3.5 w-3.5 fill-current" />
            <span>4.9/5</span>
          </div>
          <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer underline decoration-dotted">
            (417 reviews)
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProductInfo
