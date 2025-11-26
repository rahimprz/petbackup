"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PawPrint } from "lucide-react"

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Seeded PRNG to avoid hydration mismatches
  const particles = useMemo(() => {
    let t = 987654321 >>> 0
    const rand = () => {
      t = (1664525 * t + 1013904223) >>> 0
      return t / 4294967296
    }
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: rand() * 100 + 50,
      left: rand() * 100,
      top: rand() * 100,
      duration: 8 + rand() * 4,
      delay: rand() * 2,
    }))
  }, [])

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Minimum loading time for smooth experience
    const minLoadTime = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = "auto"
    }, 2000)

    // Also check if page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
        document.body.style.overflow = "auto"
      }, 500)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      clearInterval(progressInterval)
      clearTimeout(minLoadTime)
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient layers */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/15"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
            
          {/* Animated particles (deterministic) */}
          {particles.map((p) => (
              <motion.div
              key={p.id}
                className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30 blur-xl"
                style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                }}
                animate={{
                  x: [0, 100, -100, 0],
                  y: [0, -100, 100, 0],
                  scale: [1, 1.5, 0.8, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                duration: p.duration,
                delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative"
            >
              <motion.div
                className="relative h-32 w-32 rounded-full flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.35)",
                    "0 0 36px rgba(0, 217, 255, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.35)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Circular progress ring */}
                <svg className="absolute h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="fill-none stroke-secondary"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity={0.4}
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="52"
                    className="fill-none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    style={{
                      stroke: "url(#petshop-gradient)",
                      strokeDasharray: 2 * Math.PI * 52,
                      strokeDashoffset: 2 * Math.PI * 52 * (1 - Math.min(progress, 100) / 100),
                    }}
                  />
                  <defs>
                    <linearGradient id="petshop-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgb(59 130 246)" />
                      <stop offset="100%" stopColor="rgb(34 211 238)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center icon */}
                <PawPrint className="h-12 w-12 text-primary" />

                {/* Rotating thin ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center space-y-2"
            >
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                PetShop
              </h1>
              <p className="text-sm text-muted-foreground font-medium tracking-wider uppercase">
                Loading Virtual Pets...
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "300px" }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-[300px] h-2 bg-secondary rounded-full overflow-hidden border border-primary/20"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="h-full w-1/3 bg-white/30 rounded-full"
                  animate={{
                    x: ["-100%", "400%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Percentage Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-2xl font-bold text-primary"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-8 left-8">
            <motion.div
              className="h-16 w-16 rounded-full bg-primary/20 blur-2xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <div className="absolute bottom-8 right-8">
            <motion.div
              className="h-20 w-20 rounded-full bg-accent/20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


