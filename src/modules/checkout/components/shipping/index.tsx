"use client"

import { setShippingMethod } from "@lib/data/cart"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"

  // Auto-select the first available shipping method
  useEffect(() => {
    if (isOpen && availableShippingMethods && availableShippingMethods.length > 0) {
      const currentMethodId = cart.shipping_methods?.at(-1)?.shipping_option_id

      // If no shipping method is selected, auto-select the first one
      if (!currentMethodId) {
        const firstMethod = availableShippingMethods[0]
        setIsLoading(true)
        setShippingMethod({ cartId: cart.id, shippingMethodId: firstMethod.id })
          .then(() => {
            // Auto-proceed to payment after selection
            setTimeout(() => {
              router.push(pathname + "?step=payment", { scroll: false })
            }, 500)
          })
          .catch((err) => {
            setError(err.message)
            setIsLoading(false)
          })
      } else {
        // If method already selected, just proceed to payment
        setTimeout(() => {
          router.push(pathname + "?step=payment", { scroll: false })
        }, 300)
      }
    }
  }, [isOpen, availableShippingMethods, cart.id])

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  return (
    <div className="bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline text-foreground",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-accent" />
          )}
        </Heading>
        {!isOpen &&
          cart?.shipping_address &&
          cart?.billing_address &&
          cart?.email && (
            <Text>
              <button
                onClick={handleEdit}
                className="text-accent hover:text-accent/80 transition-colors font-medium"
                data-testid="edit-delivery-button"
              >
                Edit
              </button>
            </Text>
          )}
      </div>
      {isOpen ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 p-4 bg-primary/10 rounded-full">
            <svg className="w-8 h-8 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">Setting up digital delivery...</p>
          <p className="text-sm text-muted-foreground">
            Your items will be delivered digitally. Proceeding to payment.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-secondary/10 border border-border/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Digital Delivery</p>
                <p className="text-xs text-muted-foreground">Items will be delivered to your account</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Divider className="mt-8 border-border/20" />
    </div>
  )
}

export default Shipping
