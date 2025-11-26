"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@components/ProductCard"
import { Product } from "@/types/product"
import { Button } from "@components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight, Rocket, CreditCard, Headphones } from "lucide-react"
import { useRef, useState, useEffect } from "react"

interface ProductGridProps {
  products: Product[]
  title?: string
  showViewAll?: boolean
  showTitle?: boolean
  enableHorizontalScroll?: boolean
}

export function ProductGrid({ products, title = "Best Sellers", showViewAll = true, showTitle = true, enableHorizontalScroll }: ProductGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      checkScrollButtons()
    }, 100)

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
    }
    
    return () => {
      clearTimeout(timer)
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [products])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      const scrollTo = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
    }
  }

  // For the products page, show all products in a grid instead of horizontal scroll
  // Use horizontal scroll if explicitly enabled OR if showViewAll is true (default behavior)
  // Only use grid layout if on products page (showViewAll=false AND enableHorizontalScroll not set)
  const useHorizontalScroll = enableHorizontalScroll !== false && (enableHorizontalScroll === true || showViewAll === true)
  const isProductsPage = !showViewAll && !enableHorizontalScroll

  if (isProductsPage) {
    return (
      <section className="py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={i === 0 || i === 2 ? "text-primary" : ""}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mt-2" />
            </motion.div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {showTitle && (
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center mb-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
              >
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
                <span className="text-sm font-semibold text-primary">Premium Collection</span>
              </motion.div>
              
              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {title.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={i === 0 || i === 2 ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" : ""}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-primary" />
                <div className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
                <div className="h-1 w-16 bg-gradient-to-r from-accent to-transparent" />
              </div>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Discover our top-rated virtual pets and exclusive items
              </motion.p>
              
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8"
              >
                {[
                  { 
                    label: "Instant Delivery", 
                    icon: Rocket, 
                    description: "Same-day",
                    color: "text-green-400",
                    bgColor: "bg-green-500/10",
                    borderColor: "border-green-500/20"
                  },
                  { 
                    label: "Secure Payment", 
                    icon: CreditCard, 
                    description: "Protected",
                    color: "text-blue-400",
                    bgColor: "bg-blue-500/10",
                    borderColor: "border-blue-500/20"
                  },
                  { 
                    label: "24/7 Support", 
                    icon: Headphones, 
                    description: "Always here",
                    color: "text-purple-400",
                    bgColor: "bg-purple-500/10",
                    borderColor: "border-purple-500/20"
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-lg ${feature.bgColor} border ${feature.borderColor} backdrop-blur-sm hover:shadow-md transition-all duration-300`}
                    >
                      <div className={`relative ${feature.color}`}>
                        <Icon className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform duration-300" />
                        <motion.div
                          className={`absolute inset-0 ${feature.color} blur-sm opacity-0 group-hover:opacity-40`}
                          animate={{ opacity: [0, 0.4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs md:text-sm font-semibold text-foreground">
                          {feature.label}
                        </span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {feature.description}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Scroll buttons - always show for horizontal scroll on desktop */}
        {(showViewAll || enableHorizontalScroll) && (
          <div className="hidden md:flex items-center justify-center gap-2 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            {showViewAll && (
              <Link href="/products">
                <Button className="gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        )}

        {/* Horizontal scrollable container */}
        <div className="relative">
          {/* Scroll buttons for mobile - overlay */}
          <div className="md:hidden flex justify-between items-center absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 pointer-events-none px-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full bg-background/90 backdrop-blur-sm shadow-lg pointer-events-auto"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full bg-background/90 backdrop-blur-sm shadow-lg pointer-events-auto"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-visible scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
            style={{
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] lg:w-[280px]"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>

        {showViewAll && (
          <div className="flex md:hidden justify-center mt-8">
            <Link href="/products">
              <Button className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
        
        {/* Show scroll buttons on mobile even when showViewAll is false but horizontal scroll is enabled */}
        {!showViewAll && enableHorizontalScroll && (
          <div className="flex md:hidden justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="rounded-full"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="rounded-full"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}


