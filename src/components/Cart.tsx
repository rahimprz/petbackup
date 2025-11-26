"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import type { HttpTypes } from "@medusajs/types"
import { Product } from "@/types/product"
import { SheetHeader, SheetTitle } from "@components/ui/sheet"
import { Button } from "@components/ui/button"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useToast } from "@components/ui/toast"
import { sdk } from "@lib/sdk"
import dynamic from "next/dynamic"

// Lazy load StripePayment only when needed (for checkout)
const StripePayment = dynamic(() => import("@components/StripePayment"), {
  ssr: false,
})

type MedusaCart = HttpTypes.StoreCart
type MedusaCartItem = HttpTypes.StoreCartLineItem

interface CartContextType {
  cart: MedusaCart | null
  isOpen: boolean
  toggleCart: () => void
  addItem: (product: Product) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  refreshCart: () => Promise<void>
  initializePayment: () => Promise<void>
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_ID_KEY = "medusa_cart_id"

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<MedusaCart | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Load or create cart on mount (only on client-side)
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return
    
    async function initializeCart() {
      try {
        const storedCartId = localStorage.getItem(CART_ID_KEY)
        if (storedCartId) {
          try {
            const retrievedCart = await sdk.store.cart.retrieve(storedCartId)
            if (retrievedCart.cart) {
              setCart(retrievedCart.cart as MedusaCart)
              return
            }
          } catch (err) {
            // Cart might be invalid, create a new one
            console.warn("Could not retrieve stored cart:", err)
            localStorage.removeItem(CART_ID_KEY)
          }
        }
        // Create new cart only if we don't have a valid one
        const response = await sdk.store.cart.create({})
        if (response.cart) {
          const newCart = response.cart as MedusaCart
          setCart(newCart)
          localStorage.setItem(CART_ID_KEY, newCart.id)
        }
      } catch (error) {
        console.error("Error initializing cart:", error)
      }
    }

    // Small delay to avoid blocking page load
    const timeoutId = setTimeout(initializeCart, 100)
    return () => clearTimeout(timeoutId)
  }, [])

  const refreshCart = useCallback(async () => {
    if (!cart?.id) return
    try {
      const response = await sdk.store.cart.retrieve(cart.id)
      if (response.cart) {
        setCart(response.cart as MedusaCart)
      }
    } catch (error) {
      console.error("Error refreshing cart:", error)
    }
  }, [cart?.id])

  const addItem = async (product: Product) => {
    if (!cart?.id) {
      alert("Cart not initialized. Please try again.")
      return
    }

    if (!product.variantId) {
      alert("Product variant not available. Please try again.")
      return
    }

    try {
      await sdk.store.cart.createLineItem(
        cart.id,
        {
          variant_id: product.variantId,
          quantity: 1,
        }
      )
      await refreshCart()
      setIsOpen(true)
    } catch (error: any) {
      console.error("Error adding item to cart:", error)
      alert(`Failed to add item: ${error.message || "Unknown error"}`)
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cart?.id) return
    try {
      await sdk.store.cart.deleteLineItem(cart.id, lineItemId)
      await refreshCart()
    } catch (error: any) {
      console.error("Error removing item from cart:", error)
      alert(`Failed to remove item: ${error.message || "Unknown error"}`)
    }
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart?.id) return
    if (quantity <= 0) {
      await removeItem(lineItemId)
      return
    }
    try {
      await sdk.store.cart.updateLineItem(cart.id, lineItemId, { quantity })
      await refreshCart()
    } catch (error: any) {
      console.error("Error updating cart item quantity:", error)
      alert(`Failed to update quantity: ${error.message || "Unknown error"}`)
    }
  }

  const initializePayment = async () => {
    if (!cart?.id) return

    try {
      // First, ensure cart has email and addresses set (required for payment)
      // For now, we'll use placeholder values - in a real app, you'd collect these from the user
      const updates: HttpTypes.StoreUpdateCart = {}

      if (!cart.email) {
        updates.email = "customer@example.com" // TODO: Collect from user in a form
      }

      if (!cart.billing_address) {
        updates.billing_address = {
          first_name: "John",
          last_name: "Doe",
          address_1: "123 Main St",
          city: "New York",
          country_code: "us",
          postal_code: "10001",
        }
      }

      if (!cart.shipping_address) {
        updates.shipping_address = {
          first_name: "John",
          last_name: "Doe",
          address_1: "123 Main St",
          city: "New York",
          country_code: "us",
          postal_code: "10001",
        }
      }

      // Update cart with required information if needed
      if (Object.keys(updates).length > 0) {
        await sdk.store.cart.update(cart.id, updates)
      }

      // After updating the cart with email and addresses, payment sessions should be automatically available
      // Retrieve the updated cart which should now include payment_collection with available payment sessions
      await refreshCart()
    } catch (error: any) {
      console.error("Error initializing payment:", error)
      alert(`Failed to initialize payment: ${error.message || "Unknown error"}`)
    }
  }

  const clearCart = () => {
    setCart(null)
    localStorage.removeItem(CART_ID_KEY)
  }

  const getTotal = () => {
    return cart?.total ? cart.total / 100 : 0 // Convert from cents
  }

  const getItemCount = () => {
    return cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
  }

  const toggleCart = () => setIsOpen(!isOpen)

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        refreshCart,
        initializePayment,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
      <CartDrawer />
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

function CartDrawer() {
  const { cart, isOpen, toggleCart, updateQuantity, removeItem, getTotal, initializePayment } = useCart()
  const { showToast } = useToast()
  const [showCheckout, setShowCheckout] = useState(false)

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: cart?.region?.currency_code || "USD" }).format(value)

  const handleRemoveItem = async (itemId: string, itemName: string) => {
    await removeItem(itemId)
    showToast({
      title: "Item removed",
      description: `${itemName} has been removed from your cart`,
      variant: "default",
    })
  }

  const handleUpdateQuantity = async (itemId: string, quantity: number, itemName: string) => {
    if (quantity <= 0) {
      await handleRemoveItem(itemId, itemName)
      return
    }
    await updateQuantity(itemId, quantity)
  }

  const handleCheckout = async () => {
    if (!cart?.items || cart.items.length === 0) return

    if (!cart.payment_collection) {
      await initializePayment()
    }

    setShowCheckout(true)
  }

  const items = cart?.items || []
  const hasPaymentSession = cart?.payment_collection?.payment_sessions && cart?.payment_collection?.payment_sessions.length > 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-black/50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-card border-l shadow-lg z-50 flex flex-col"
          >
            <SheetHeader className="p-6 border-b">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl font-bold">Shopping Cart</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowCheckout(false)
                    toggleCart()
                  }}
                  className="rounded-full"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Start shopping to add items to your cart
                  </p>
                </div>
              ) : (
                <>
                  {showCheckout && hasPaymentSession ? (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold mb-4">Payment</h3>
                      <StripePayment />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex gap-4 p-4 rounded-lg border bg-secondary/30"
                          >
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                              <Image
                                src={item.thumbnail || item.variant?.product?.thumbnail || "/placeholder.png"}
                                alt={item.title || item.variant?.product?.title || "Product"}
                                fill
                                className="object-cover"
                                unoptimized={(item.thumbnail || item.variant?.product?.thumbnail || "").includes('api.blox.pet')}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop"
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 truncate">
                                {item.title || item.variant?.product?.title || "Product"}
                              </h4>
                              <p className="text-primary font-bold mb-2">
                                {formatPrice(item.unit_price / 100)}
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.title || item.variant?.product?.title || "Product")}
                                  aria-label={`Decrease quantity of ${item.title || "item"}`}
                                >
                                  <Minus className="h-3 w-3" aria-hidden="true" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium" aria-label={`Quantity: ${item.quantity}`}>
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.title || item.variant?.product?.title || "Product")}
                                  aria-label={`Increase quantity of ${item.title || "item"}`}
                                >
                                  <Plus className="h-3 w-3" aria-hidden="true" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => handleRemoveItem(item.id, item.title || item.variant?.product?.title || "Product")}
                                  aria-label={`Remove ${item.title || "item"} from cart`}
                                >
                                  <X className="h-4 w-4" aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </>
              )}
            </div>

            {items.length > 0 && !showCheckout && (
              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(getTotal())}</span>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
