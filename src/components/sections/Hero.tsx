"use client"

import { motion } from "framer-motion"
import { Button } from "@components/ui/button"
import { TrustBadge } from "./TrustBadge"
import Link from "next/link"
import { Sparkles, Zap, Shield, Star, Rocket, CreditCard, Headphones } from "lucide-react"

// Use a seeded PRNG so SSR and CSR render the same initial HTML
function createSeededRandom(seed: number) {
  let t = seed >>> 0
  return function rand() {
    // LCG parameters from Numerical Recipes
    t = (1664525 * t + 1013904223) >>> 0
    return t / 4294967296
  }
}

const floatingElements = [
  { icon: Sparkles, delay: 0, x: "10%", y: "20%" },
  { icon: Zap, delay: 0.2, x: "80%", y: "30%" },
  { icon: Shield, delay: 0.4, x: "15%", y: "70%" },
  { icon: Star, delay: 0.6, x: "85%", y: "75%" },
]

// Enhanced animated gradient background particles (deterministic)
const createParticles = () => {
  const rand = createSeededRandom(123456)
  const particles = []
  for (let i = 0; i < 30; i++) {
    particles.push({
      id: i,
      size: rand() * 150 + 80,
      x: rand() * 100,
      y: rand() * 100,
      duration: rand() * 15 + 20,
      delay: rand() * 8,
      opacity: rand() * 0.3 + 0.1,
    })
  }
  return particles
}

const particles = createParticles()

// Create animated waves
const createWaves = () => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 8 + i * 2,
  }))
}

const waves = createWaves()

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Multi-layer Animated Gradient Background */}
      <div className="absolute inset-0">
        {/* Layer 1: Primary gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/15"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{ willChange: "background-position" }}
        />
        
        {/* Layer 2: Secondary gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tl from-accent/15 via-primary/5 to-accent/20"
          animate={{
            backgroundPosition: ["100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{ willChange: "background-position" }}
        />
        
        {/* Layer 3: Radial gradient pulse */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Animated Wave Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: `${100 + wave.id * 30}px`,
              background: `linear-gradient(180deg, transparent, rgba(59, 130, 246, ${0.05 + wave.id * 0.02}))`,
              clipPath: "polygon(0 100%, 100% 100%, 100% 80%, 0 60%)",
            }}
            animate={{
              clipPath: [
                "polygon(0 100%, 100% 100%, 100% 80%, 0 60%)",
                "polygon(0 100%, 100% 100%, 100% 70%, 0 50%)",
                "polygon(0 100%, 100% 100%, 100% 80%, 0 60%)",
              ],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: wave.duration,
              delay: wave.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-2xl"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, 150, -150, 0],
              y: [0, -150, 150, 0],
              scale: [1, 1.8, 0.6, 1],
              opacity: [particle.opacity, particle.opacity * 2, particle.opacity * 0.5, particle.opacity],
              rotate: [0, 360],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "60px 60px"],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Diagonal grid overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.05) 10px, rgba(59, 130, 246, 0.05) 20px)
            `,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Enhanced Floating Decorative Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => {
          const Icon = element.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.7, 0.2],
                scale: [1, 1.5, 1],
                x: [0, 50, -50, 0],
                y: [0, -50, 50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6 + index,
                delay: element.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                left: element.x,
                top: element.y,
              }}
            >
              <div className="relative">
                <Icon className="h-16 w-16 text-primary/40 drop-shadow-2xl" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, ${0.1 + i * 0.05}), transparent)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.3, 0.8, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 12 + i * 3,
              delay: i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-secondary/30" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <TrustBadge />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight relative">
              <span className="block">Instantly Buy Your</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Favorite Items
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl mt-2">
                Fast, Safe & Easy!
              </span>
              <motion.span
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-[3px] w-40 rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: [120, 220, 160] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </h1>
          </motion.div>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            PetShop is the fastest, cheapest, and safest shop for Plants vs Brainrots items,
            with instant delivery.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center"
          >
            <Link href="#select-game">
              <Button
                size="lg"
                className="relative overflow-hidden text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300"
              >
                SELECT A GAME
                <motion.span
                  className="pointer-events-none absolute inset-0"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background:
                      "radial-gradient(120px 50px at 10% 50%, rgba(255,255,255,0.18), transparent), radial-gradient(120px 50px at 90% 50%, rgba(255,255,255,0.18), transparent)",
                  }}
                />
              </Button>
            </Link>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {[
              { 
                label: "Instant Delivery", 
                icon: Rocket, 
                description: "Same-day processing",
                gradient: "from-green-500/20 to-emerald-500/20",
                borderColor: "border-green-500/30",
                iconColor: "text-green-400"
              },
              { 
                label: "Secure Payment", 
                icon: CreditCard, 
                description: "100% protected",
                gradient: "from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30",
                iconColor: "text-blue-400"
              },
              { 
                label: "24/7 Support", 
                icon: Headphones, 
                description: "Always available",
                gradient: "from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30",
                iconColor: "text-purple-400"
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`group relative px-5 py-3 rounded-xl bg-gradient-to-br ${feature.gradient} border ${feature.borderColor} backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`relative ${feature.iconColor}`}>
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <motion.div
                        className={`absolute inset-0 ${feature.iconColor} blur-md opacity-0 group-hover:opacity-50`}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground leading-tight">
                        {feature.label}
                      </span>
                      <span className="text-xs text-muted-foreground leading-tight">
                        {feature.description}
                      </span>
                    </div>
                  </div>
                  {/* Pulse glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10"
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
