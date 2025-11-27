import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      <div className="w-full bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 flex flex-col shadow-xl">
        <Divider className="my-6 small:hidden border-border/20" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline text-foreground font-bold"
        >
          In your Cart
        </Heading>
        <Divider className="my-6 border-border/20" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
