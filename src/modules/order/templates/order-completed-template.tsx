"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import React from "react"
import { CheckCircle2, User, MessageSquare } from "lucide-react"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const robloxUsername = order.metadata?.roblox_username as string || order.cart?.metadata?.roblox_username as string
  const discordUsername = order.metadata?.discord_username as string || order.cart?.metadata?.discord_username as string

  return (
    <div className="flex flex-col gap-y-8 min-h-screen bg-background py-12">
      <div className="content-container">
        {/* Success Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <div className="mb-6 p-6 bg-green-500/10 rounded-full">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Thank you for your purchase
          </p>
          <p className="text-sm text-muted-foreground">
            Order #{order.display_id}
          </p>
        </div>

        {/* Digital Delivery Information */}
        {(robloxUsername || discordUsername) && (
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Digital Delivery Information
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your items will be delivered to the following account(s):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {robloxUsername && (
                <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Roblox Username</p>
                    <p className="text-base font-semibold text-foreground">{robloxUsername}</p>
                  </div>
                </div>
              )}
              {discordUsername && (
                <div className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Discord Username</p>
                    <p className="text-base font-semibold text-foreground">{discordUsername}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">What's Next?</p>
                  <p className="text-xs text-muted-foreground">
                    Our team will deliver your items to your account shortly. You may be contacted via Discord if we need any additional information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="flex flex-col gap-4 bg-card/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl">
          <OrderDetails order={order} showStatus />
          <Items order={order} />
          <OrderSummary order={order} />
          <Help />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <LocalizedClientLink
            href="/store"
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 text-center shadow-lg shadow-primary/20"
          >
            Continue Shopping
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/account/orders"
            className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-xl transition-all duration-200 text-center border border-border/50"
          >
            View All Orders
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate
