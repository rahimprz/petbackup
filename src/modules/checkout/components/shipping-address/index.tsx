import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import React, { useEffect, useMemo, useState } from "react"
import CountrySelect from "../country-select"

const ShippingAddress = ({
  customer,
  cart,
  checked,
  onChange,
}: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    roblox_username: (cart?.metadata?.roblox_username as string) || "",
    discord_username: (cart?.metadata?.discord_username as string) || "",
    email: cart?.email || "",
    "shipping_address.country_code": cart?.shipping_address?.country_code || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  useEffect(() => {
    // Load saved usernames from cart metadata if available
    if (cart?.metadata) {
      setFormData((prevState) => ({
        ...prevState,
        roblox_username: (cart.metadata?.roblox_username as string) || prevState.roblox_username,
        discord_username: (cart.metadata?.discord_username as string) || prevState.discord_username,
      }))
    }

    if (cart && !cart.email && customer?.email) {
      setFormData((prevState) => ({
        ...prevState,
        email: customer.email,
      }))
    }

    if (cart?.shipping_address?.country_code) {
      setFormData((prevState) => ({
        ...prevState,
        "shipping_address.country_code": cart?.shipping_address?.country_code,
      }))
    }
  }, [cart, customer])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="mb-6 bg-secondary/10 border border-border/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Digital Delivery Information
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your item will be delivered digitally. Please provide your username details below.
        </p>
      </div>

      {/* Hidden fields to generate placeholder shipping address */}
      <input type="hidden" name="shipping_address.first_name" value={formData.roblox_username || "Digital"} />
      <input type="hidden" name="shipping_address.last_name" value="Customer" />
      <input type="hidden" name="shipping_address.address_1" value="Digital Goods - No Physical Shipping" />
      <input type="hidden" name="shipping_address.company" value="" />
      <input type="hidden" name="shipping_address.postal_code" value="00000" />
      <input type="hidden" name="shipping_address.city" value="Online" />
      <input type="hidden" name="shipping_address.province" value="" />
      <input type="hidden" name="shipping_address.phone" value="" />

      {/* Custom metadata fields */}
      <input type="hidden" name="metadata.roblox_username" value={formData.roblox_username} />
      <input type="hidden" name="metadata.discord_username" value={formData.discord_username} />

      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Roblox Username"
          name="roblox_username"
          value={formData.roblox_username}
          onChange={handleChange}
          required
          data-testid="roblox-username-input"
        />
        <Input
          label="Discord Username"
          name="discord_username"
          value={formData.discord_username}
          onChange={handleChange}
          required
          data-testid="discord-username-input"
        />
        <CountrySelect
          name="shipping_address.country_code"
          autoComplete="country"
          region={cart?.region}
          value={formData["shipping_address.country_code"]}
          onChange={handleChange}
          required
          data-testid="shipping-country-select"
        />
      </div>

      <div className="my-8">
        <Checkbox
          label="Billing address same as shipping address"
          name="same_as_billing"
          checked={checked}
          onChange={onChange}
          data-testid="billing-address-checkbox"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <Input
          label="Email"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="shipping-email-input"
        />
      </div>

      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">How Delivery Works</p>
            <p className="text-xs text-muted-foreground">
              After successful payment, your purchased items will be delivered to your Roblox account. You may be contacted via Discord if needed. Please ensure both usernames are correct.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingAddress
