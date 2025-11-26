"use client"

import { motion } from "framer-motion"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { ArrowRight, Sparkles, Users, TrendingUp, Rocket, CreditCard, Headphones } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Rocket,
    title: "Instant Delivery",
    description: "Same-day",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Protected",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  }
]

export function GameSelector() {
  return (
    <section id="select-game" className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(800px 300px at 50% 50%, rgba(59,130,246,0.15), transparent)",
          }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
          >
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Featured Collection</span>
          </motion.div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Games
            </span>{" "}
            
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Items available for games and more
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-primary" />
            <div className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            <div className="h-1 w-16 bg-gradient-to-r from-accent to-transparent" />
          </div>
        </motion.div>

        {/* Best Sellers Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative"
          >
            <Card className="border-2 border-primary/50 hover:border-primary cursor-pointer bg-gradient-to-br from-card via-card to-secondary/10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden relative">
              {/* Gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-green-500/50 to-emerald-500/50 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300 rounded-xl"
                initial={false}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <CardContent className="flex flex-col p-8 space-y-6 relative z-10">
                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    Plants vs Brainrots
                  </h3>
                  
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Virtual pets and items for Plants vs Brainrots
                  </p>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-primary/20"
                  >
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Sparkles className="h-4 w-4 text-green-400" />
                        <span className="text-lg font-bold text-foreground">500+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Items</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Users className="h-4 w-4 text-blue-400" />
                        <span className="text-lg font-bold text-foreground">100+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Pets</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <TrendingUp className="h-4 w-4 text-yellow-400" />
                        <span className="text-lg font-bold text-foreground">10k+</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Sales</p>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link href="/products" className="block w-full">
                    <Button
                      size="lg"
                      className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 group/btn"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Shop Now
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </span>
                      <motion.span
                        className="pointer-events-none absolute inset-0"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                          background:
                            "radial-gradient(100px 40px at 10% 50%, rgba(255,255,255,0.2), transparent), radial-gradient(100px 40px at 90% 50%, rgba(255,255,255,0.2), transparent)",
                        }}
                      />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group relative p-6 rounded-xl ${feature.bgColor} border ${feature.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300 text-center`}
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                  {feature.title === "Instant Delivery" && (
                    <motion.div
                      className={`absolute inset-0 ${feature.color} blur-md opacity-0 group-hover:opacity-50 rounded-xl`}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

























