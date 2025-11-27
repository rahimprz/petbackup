"use client"

import { motion } from "framer-motion"

export const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <motion.div
                    className="h-24 w-24 rounded-full border-t-4 border-l-4 border-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner pulsing circle */}
                <motion.div
                    className="absolute h-16 w-16 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Center dot */}
                <div className="absolute h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
            </div>

            {/* Loading text */}
            <motion.p
                className="absolute mt-32 text-lg font-bold text-primary tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                Loading
            </motion.p>
        </div>
    )
}
