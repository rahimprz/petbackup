"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    rating: 5,
    text: "Amazing service! Got my virtual pet delivered instantly. The quality is outstanding and the support team is always helpful.",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Sarah Williams",
    rating: 5,
    text: "Best prices I've found anywhere. Fast delivery and secure transactions. Highly recommend to anyone looking for virtual pets!",
    avatar: "SW",
  },
  {
    id: 3,
    name: "Mike Chen",
    rating: 5,
    text: "Been shopping here for months. Never had any issues. The products are exactly as described and delivery is always on time.",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: 5,
    text: "Customer service is top-notch! They helped me with my order and resolved everything quickly. Will definitely shop again.",
    avatar: "ED",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            What Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - see what our satisfied customers have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-2 border-secondary/50 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card/80 via-card/60 to-secondary/30 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/20 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05, type: "spring" }}
                      >
                        <Star
                          className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          aria-hidden="true"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, rotate: -10 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <Quote className="h-8 w-8 text-primary/40 mb-4 group-hover:text-primary/60 transition-colors" />
                  </motion.div>
                  <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/90 transition-colors">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-secondary/50">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30"
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-bold text-sm md:text-base text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

