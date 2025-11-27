"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4 bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      <Heading level="h2" className="text-[2rem] leading-[2.75rem] text-foreground font-bold mb-2">
        Summary
      </Heading>

      <DiscountCode cart={cart} />

      <Divider className="border-border/20 my-2" />

      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="w-full mt-4"
      >
        <Button className="w-full h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-0.5">
          Go to checkout
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
