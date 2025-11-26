"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { Button } from "@components/ui/button"
import { Product } from "@/types/product"
import { fetchProducts } from "@lib/medusa-api"
import Image from "next/image"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch products when modal opens
  useEffect(() => {
    if (isOpen && products.length === 0) {
      setLoading(true)
      fetchProducts()
        .then((fetchedProducts) => {
          setProducts(fetchedProducts)
        })
        .catch((error) => {
          console.error("Failed to load products for search:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isOpen, products.length])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setResults(filtered.slice(0, 6))
    } else {
      setResults([])
    }
  }, [searchQuery, products])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-card border-b shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 max-h-[60vh] overflow-y-auto"
                >
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading products...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={onClose}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex gap-3 p-3 rounded-lg border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                unoptimized={product.image.includes('api.blox.pet')}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop"
                                }}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 truncate">
                                {product.name}
                              </h4>
                              <p className="text-primary font-bold">
                                ${(product.price / 100).toFixed(2)}
                              </p>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No products found
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

