"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Shield, Zap, Lock, CheckCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface TutorialVideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const safetyFeatures = [
  {
    icon: Lock,
    title: "No Password Required",
    description: "Your account stays secure",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    icon: Shield,
    title: "100% Safe",
    description: "Trusted by thousands",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Within minutes",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  {
    icon: CheckCircle2,
    title: "Easy Process",
    description: "Just your username",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20"
  }
]

export function TutorialVideoModal({ isOpen, onClose }: TutorialVideoModalProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Extract video ID from YouTube URL
  useEffect(() => {
    const url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1&pp=ygUIcmlja3JvbGygBwE%3D"
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    if (match && match[1]) {
      setVideoId(match[1])
    }
  }, [])

  // Auto-play video when modal opens
  useEffect(() => {
    if (isOpen && videoId) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        const iframe = document.querySelector('iframe[src*="youtube.com/embed"]') as HTMLIFrameElement
        if (iframe) {
          // YouTube autoplay is handled via URL parameter
          // We'll set it in the embed URL itself
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen, videoId])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  // Don't render on server side
  if (!mounted) return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
            onClick={onClose}
            style={{ isolation: 'isolate' }}
          />

          {/* Modal */}
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 pointer-events-none"
            style={{ isolation: 'isolate' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative bg-background rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] pointer-events-auto border border-primary/20 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[10000] p-1.5 sm:p-2 rounded-full bg-secondary/80 hover:bg-secondary border border-primary/20 transition-colors group"
                aria-label="Close modal"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              {/* Content - Flex container to fit viewport */}
              <div className="flex flex-col h-full overflow-hidden p-3 sm:p-4 md:p-6 lg:p-8">
                {/* Header - Shrinks on small screens */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-3 sm:mb-4 md:mb-6 flex-shrink-0"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 leading-tight">
                    Watch How Our{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      BloxPet
                    </span>{" "}
                    Works
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                    Learn how to get your items delivered instantly and safely
                  </p>
                </motion.div>

                {/* Safety Features Grid - Compact on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6 flex-shrink-0"
                >
                  {safetyFeatures.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl ${feature.bgColor} border ${feature.borderColor} text-center group`}
                      >
                        <div className={`inline-flex p-1.5 sm:p-2 rounded-lg ${feature.bgColor} mb-1 sm:mb-2 group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${feature.color}`} />
                        </div>
                        <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-foreground mb-0.5 sm:mb-1 leading-tight">
                          {feature.title}
                        </h3>
                        <p className="text-[9px] sm:text-xs text-muted-foreground leading-tight hidden sm:block">
                          {feature.description}
                        </p>
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Video Container - Takes remaining space */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative rounded-lg sm:rounded-xl overflow-hidden bg-secondary/20 border border-primary/20 flex-1 min-h-0 w-full"
                  style={{ aspectRatio: '16/9' }}
                >
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      title="Tutorial Video"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-muted-foreground text-sm">Loading video...</p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )

  // Render modal using portal to document.body to ensure it's always on top
  return createPortal(modalContent, document.body)
}

