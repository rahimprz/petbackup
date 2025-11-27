"use client"

import { motion } from "framer-motion"
import { Package, Sparkles, Loader2 } from "lucide-react"

export default function StoreLoading() {
    return (
        <div className="relative min-h-screen">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="flex flex-col small:flex-row small:items-start py-6 content-container relative z-10">
                {/* Sidebar Skeleton */}
                <div className="w-full small:w-64 flex-shrink-0 mb-8 small:mb-0 small:mr-8">
                    <div className="space-y-6">
                        {/* Sort/Filter Skeleton */}
                        <div className="animate-pulse">
                            <div className="h-6 bg-primary/10 rounded-md w-24 mb-4" />
                            <div className="space-y-2">
                                <div className="h-10 bg-secondary/40 rounded-lg" />
                                <div className="h-10 bg-secondary/40 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-border/50 backdrop-blur-sm overflow-hidden">
                            {/* Decorative icon */}
                            <motion.div
                                className="absolute top-4 right-4 opacity-10"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Package className="h-24 w-24" />
                            </motion.div>

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4"
                                >
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-semibold text-primary">Shop</span>
                                </motion.div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                                    All Products
                                </h1>

                                <p className="text-lg text-muted-foreground max-w-2xl">
                                    Discover our complete collection of premium items. Use the filters to find exactly what you're looking for.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Loading State with Spinner */}
                    <div className="flex flex-col items-center justify-center py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="h-16 w-16 text-primary" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6 text-lg text-muted-foreground font-medium"
                        >
                            Loading products...
                        </motion.p>

                        {/* Product Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="animate-pulse"
                                >
                                    <div className="rounded-2xl border border-border/50 bg-secondary/20 overflow-hidden">
                                        <div className="aspect-square bg-primary/10" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-5 bg-primary/10 rounded-md w-3/4" />
                                            <div className="h-4 bg-primary/10 rounded-md w-1/2" />
                                            <div className="h-8 bg-primary/10 rounded-lg w-full mt-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
