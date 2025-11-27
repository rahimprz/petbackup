"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div>
      <div className="flex flex-col gap-y-3 txt-medium text-muted-foreground">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground/80">Subtotal (excl. shipping and taxes)</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0} className="text-foreground">
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground/80">Shipping</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0} className="text-foreground">
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span className="text-accent">Discount</span>
            <span
              className="text-accent"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center text-muted-foreground/80">Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0} className="text-foreground">
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-border/20 my-4 border-dashed" />
      <div className="flex items-center justify-between text-foreground mb-2 txt-medium font-bold">
        <span className="text-lg">Total</span>
        <span
          className="txt-xlarge-plus text-foreground font-extrabold text-2xl"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      <div className="h-px w-full border-b border-border/20 mt-4 border-dashed" />
    </div>
  )
}

export default CartTotals
