"use client"

import { motion } from "framer-motion"
import { Sparkles, Shield, Bot, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Sparkles,
    title: "Pick Your Items",
    description: "Browse our collection of cool game items",
    step: "STEP 1",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/20",
    borderColor: "border-purple-500/40",
  },
  {
    icon: Shield,
    title: "Safe Payment",
    description: "Multiple trusted payment options available",
    step: "STEP 2",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/40",
  },
  {
    icon: Bot,
    title: "Claim Order in Discord",
    description: "Create a ticket in our Discord server to claim your order",
    step: "STEP 3",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/40",
  },
  {
    icon: CheckCircle,
    title: "Enjoy Your Items",
    description: "Start using your new items right away",
    step: "STEP 4",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/20",
    borderColor: "border-green-500/40",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
            >
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
              <span className="text-sm font-semibold text-primary">Simple Process</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your favorite game items delivered within 5 minutes
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting arrows - desktop only */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
              {steps.slice(0, -1).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${(index + 1) * 25}%` }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <ArrowRight className="h-6 w-6 text-primary/60" />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Step label */}
                    <div className="absolute -top-3 -right-3 z-20 bg-secondary border border-primary/30 rounded-lg px-2 py-1 text-xs font-semibold text-muted-foreground">
                      {step.step}
                    </div>

                    {/* Card */}
                    <div className={`relative h-full rounded-2xl border-2 ${step.borderColor} ${step.bgColor} backdrop-blur-sm p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary/20`}>
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                      />

                      {/* Icon */}
                      <div className="relative mb-4">
                        <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <motion.span
                          className={`absolute -inset-2 rounded-full bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-30 blur-md`}
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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


























