"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-card/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
      <span className="text-sm font-medium">4.8 on Trustpilot</span>
    </motion.div>
  )
}








































