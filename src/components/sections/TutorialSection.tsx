"use client"

import { motion } from "framer-motion"
import { Button } from "@components/ui/button"
import { Play, Shield, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { TutorialVideoModal } from "./TutorialVideoModal"

export function TutorialSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const features = [
    {
      icon: Shield,
      text: "100% Safe",
      description: "No password required",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: Clock,
      text: "Quick Video",
      description: "Under 2 minutes",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: CheckCircle2,
      text: "Easy Process",
      description: "Just your username",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    }
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background via-secondary/10 to-background relative overflow-hidden">
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
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
              >
                <Play className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Video Guide</span>
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                See How{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  PetShop
                </span>{" "}
                Works
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                Watch our quick tutorial to deliver your Roblox items straight to your game. 
                No password or account access required—just your username!
              </p>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`group relative p-4 rounded-xl ${feature.bgColor} border ${feature.borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className={`relative ${feature.color}`}>
                          <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          <motion.div
                            className={`absolute inset-0 ${feature.color} blur-md opacity-0 group-hover:opacity-50`}
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {feature.text}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {feature.description}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center"
              >
                <Button
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="relative overflow-hidden text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300 group"
                >
                  <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Tutorial Video
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
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <TutorialVideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

