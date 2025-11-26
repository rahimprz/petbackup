"use client"

import { motion } from "framer-motion"
import { HelpCircle, ChevronDown } from "lucide-react"
import { useState } from "react"

const faqItems = [
  {
    question: "How does delivery work?",
    answer: "All items are delivered instantly via our automated system. Once your payment is confirmed, you'll receive your virtual pets or items immediately in your account. No waiting, no delays - just instant delivery to your game account."
  },
  {
    question: "Are the items safe to use?",
    answer: "Yes, absolutely! We use only safe and legitimate methods to deliver items. All transactions are secure and your account information is protected. We've been serving thousands of satisfied customers with zero account issues."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit cards, debit cards, PayPal, and various cryptocurrency options. All payments are processed securely through our encrypted payment gateway."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "We offer a satisfaction guarantee! If you're not happy with your purchase, contact our support team within 24 hours of delivery and we'll work with you to resolve any issues or provide a full refund."
  }
]

interface FAQProps {
  id?: string
}

export function FAQ({ id }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id={id} className="py-20 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about shopping with us
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br from-card/80 via-card/60 to-secondary/30 backdrop-blur-xl border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isOpen
                      ? "border-primary/50 shadow-primary/20"
                      : "border-secondary/50 hover:border-primary/30"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left group-hover:bg-secondary/20 transition-colors duration-300"
                  >
                    <span className={`font-bold text-base sm:text-lg md:text-xl pr-4 transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}>
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-primary/20 text-primary"
                          : "bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

