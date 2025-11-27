"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { motion } from "framer-motion"
import { ShoppingCart, CheckCircle2, XCircle, Sparkles, ShieldCheck, Headphones, Lock, Truck } from "lucide-react"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
      <motion.div
        className="flex flex-col gap-y-6"
        ref={actionsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Stock Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg w-fit ${inStock
            ? "bg-green-500/10 border border-green-500/20"
            : "bg-red-500/10 border border-red-500/20"
            }`}
        >
          {inStock ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">In Stock</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            </>
          )}
        </motion.div>

        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleAddToCart}
            disabled={
              !inStock ||
              !selectedVariant ||
              !!disabled ||
              isAdding ||
              !isValidVariant
            }
            variant="primary"
            className="w-full h-12 relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 text-base font-semibold"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            <span className="flex items-center justify-center gap-2 relative z-10">
              <ShoppingCart className="h-5 w-5" />
              {!selectedVariant && !options
                ? "Select variant"
                : !inStock || !isValidVariant
                  ? "Out of stock"
                  : "Add to cart"}
            </span>

            {/* Shimmer effect */}
            {inStock && selectedVariant && (
              <motion.span
                className="pointer-events-none absolute inset-0"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background:
                    "radial-gradient(100px 40px at 10% 50%, rgba(255,255,255,0.2), transparent), radial-gradient(100px 40px at 90% 50%, rgba(255,255,255,0.2), transparent)",
                }}
              />
            )}
          </Button>
        </motion.div>

        {/* Trust Badges Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50 text-xs font-medium text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Safe Purchases</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50 text-xs font-medium text-muted-foreground">
            <Truck className="h-3.5 w-3.5 text-primary" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border/50 text-xs font-medium text-muted-foreground">
            <Headphones className="h-3.5 w-3.5 text-primary" />
            <span>Fast Support</span>
          </div>
        </div>

        {/* Secure Payment Options */}
        <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Secure Payment Options</span>
            <Lock className="h-3.5 w-3.5 text-green-500" />
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Payment Icons - Using simple divs with text/colors to simulate the look if SVGs aren't available, or generic icons */}
            <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border/50">
              <span className="text-blue-600 font-bold text-xs italic">VISA</span>
            </div>
            <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border/50">
              <div className="flex -space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
              </div>
            </div>
            <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border/50">
              <span className="text-black font-bold text-xs">Pay</span>
            </div>
            <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border/50">
              <span className="text-blue-500 font-bold text-xs">AMEX</span>
            </div>
            <div className="h-8 px-3 bg-white rounded flex items-center justify-center border border-border/50">
              <span className="text-blue-400 font-bold text-xs">DISCOVER</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
            <ShieldCheck className="h-3 w-3" />
            <span>All transactions encrypted and secured with 256-bit SSL protection</span>
          </div>
        </div>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </motion.div>
    </>
  )
}
