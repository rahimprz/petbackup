"use client"

import { motion } from "framer-motion"
import { Clock, Shield, Headphones, Award } from "lucide-react"

const trustSignals = [
  {
    icon: Clock,
    title: "12 Hour Delivery",
    description: "Instant delivery within 12 hours",
    color: "text-blue-400",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment processing",
    color: "text-blue-400",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help you",
    color: "text-blue-400",
  },
  {
    icon: Award,
    title: "Trusted Seller",
    description: "4.8★ rating on Trustpilot",
    color: "text-blue-400",
  },
]

export function TrustSignals() {
  return (
    <section className="py-20 bg-background relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px 200px at 50% 0%, rgba(59,130,246,0.15), transparent)",
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-2xl opacity-40" />
          <div className="relative rounded-3xl border border-primary/20 bg-secondary/20 backdrop-blur-sm p-6 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {trustSignals.map((signal, index) => {
                const Icon = signal.icon
                return (
                  <motion.div
                    key={signal.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 p-5`}
                  >
                    <motion.div
                      className="absolute -inset-0.5 rounded-2xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          "linear-gradient(120deg, rgba(59,130,246,0.25), rgba(34,211,238,0.25))",
                        filter: "blur(14px)",
                      }}
                    />
                    <div className="relative flex items-start gap-4">
                      <div className="relative">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-secondary/60 border border-primary/40`}>
                          <Icon className={`h-6 w-6 ${signal.color}`} />
                        </div>
                        <motion.span
                          className="absolute -inset-1 rounded-xl bg-primary/20 blur-md"
                          animate={{ opacity: [0.2, 0.5, 0.2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base md:text-lg mb-1">{signal.title}</h3>
                        <p className="text-sm text-muted-foreground">{signal.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
