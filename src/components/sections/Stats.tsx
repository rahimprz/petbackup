"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { label: "Happy Customers", value: "10K+", suffix: "+" },
  { label: "Products Sold", value: "50K+", suffix: "+" },
  { label: "Countries Served", value: "50+", suffix: "+" },
  { label: "Average Rating", value: "4.8", suffix: "★" },
]

function Counter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Extract numeric value
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ""))
  const isDecimal = numValue % 1 !== 0

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isDecimal ? numValue.toFixed(1) : Math.floor(numValue)}
      {suffix}
    </motion.span>
  )
}

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-secondary/30 via-background to-secondary/20 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-gradient-to-br from-card/50 to-secondary/30 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 md:p-6 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground font-semibold">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

