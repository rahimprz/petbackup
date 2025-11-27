"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Package, Truck, RefreshCw, ArrowLeft, Star, HelpCircle } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { clx } from "@medusajs/ui"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("Details")

  const tabs = [
    {
      label: "Details",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Reviews",
      component: <ReviewsTab />,
    },
    {
      label: "FAQ",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex items-center justify-center border-b border-border/50 mb-8">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={clx(
                "pb-4 text-sm font-medium transition-all duration-300 relative px-4",
                activeTab === tab.label
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.label && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {tabs.find((t) => t.label === activeTab)?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Specifications Card */}
        <div className="bg-secondary/10 border border-border/10 rounded-2xl p-6 hover:bg-secondary/20 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Specifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border/10 last:border-0">
              <span className="text-muted-foreground font-medium">Material</span>
              <span className="text-foreground font-semibold">{product.material || "-"}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/10 last:border-0">
              <span className="text-muted-foreground font-medium">Country of origin</span>
              <span className="text-foreground font-semibold">{product.origin_country || "-"}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/10 last:border-0">
              <span className="text-muted-foreground font-medium">Type</span>
              <span className="text-foreground font-semibold">{product.type?.value || "-"}</span>
            </div>
          </div>
        </div>

        {/* Dimensions Card */}
        <div className="bg-secondary/10 border border-border/10 rounded-2xl p-6 hover:bg-secondary/20 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Dimensions & Weight</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border/10 last:border-0">
              <span className="text-muted-foreground font-medium">Weight</span>
              <span className="text-foreground font-semibold">{product.weight ? `${product.weight} g` : "-"}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border/10 last:border-0">
              <span className="text-muted-foreground font-medium">Dimensions</span>
              <span className="text-foreground font-semibold">
                {product.length && product.width && product.height
                  ? `${product.length}L x ${product.width}W x ${product.height}H`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-secondary/5 border border-border/5 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-8 bg-primary rounded-full" />
          Product Description
        </h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-base">
          {product.description || "No description available."}
        </p>
      </div>
    </div>
  )
}

const ReviewsTab = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-4 rounded-full bg-secondary/30 mb-4">
        <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">4.9 out of 5</h3>
      <p className="text-muted-foreground mb-6">Based on 417 reviews</p>
      <div className="grid gap-4 max-w-2xl w-full text-left">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-secondary/20 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-sm">Amazing product!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              "Absolutely love this! The quality is outstanding and it arrived so quickly. Highly recommend to everyone."
            </p>
            <div className="mt-2 text-xs text-muted-foreground/70">
              Verified Buyer • 2 days ago
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days. Express shipping options are available at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs will be calculated at checkout."
    }
  ]

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="grid gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-xl bg-secondary/20 border border-border/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-primary" />
              {faq.question}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed pl-6">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductTabs
