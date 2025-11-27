"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function ProductLoading() {
    return (
        <>
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
                {/* Left Column - Product Info Skeleton */}
                <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[350px] w-full py-8 gap-y-8">
                    <div className="animate-pulse space-y-6">
                        {/* Title skeleton */}
                        <div className="space-y-3">
                            <div className="h-8 bg-primary/10 rounded-md w-3/4" />
                            <div className="h-6 bg-primary/10 rounded-md w-1/2" />
                        </div>

                        {/* Rating skeleton */}
                        <div className="flex gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-5 w-5 bg-primary/10 rounded-full" />
                            ))}
                        </div>

                        {/* Description skeleton */}
                        <div className="space-y-2">
                            <div className="h-4 bg-primary/10 rounded-md w-full" />
                            <div className="h-4 bg-primary/10 rounded-md w-5/6" />
                            <div className="h-4 bg-primary/10 rounded-md w-4/6" />
                        </div>
                    </div>

                    {/* Tabs skeleton */}
                    <div className="animate-pulse space-y-4">
                        <div className="flex gap-4">
                            <div className="h-10 bg-primary/10 rounded-lg w-24" />
                            <div className="h-10 bg-primary/10 rounded-lg w-24" />
                        </div>
                        <div className="h-32 bg-secondary/20 rounded-xl" />
                    </div>
                </div>

                {/* Center - Image Gallery Skeleton */}
                <div className="block w-full relative px-0 small:px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-secondary/20"
                    >
                        <div className="aspect-square relative flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="h-16 w-16 text-primary" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
                            </motion.div>
                        </div>

                        {/* Thumbnail skeleton */}
                        <div className="p-4 flex gap-2 bg-secondary/30">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-20 h-20 bg-primary/10 rounded-lg animate-pulse"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Actions Skeleton */}
                <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[350px] w-full py-8 gap-y-8">
                    <div className="animate-pulse space-y-6">
                        {/* Price skeleton */}
                        <div className="rounded-2xl border border-border/50 bg-secondary/20 p-6 space-y-4">
                            <div className="h-10 bg-primary/10 rounded-md w-32" />
                            <div className="h-4 bg-primary/10 rounded-md w-24" />
                        </div>

                        {/* Options skeleton */}
                        <div className="rounded-2xl border border-border/50 bg-secondary/20 p-6 space-y-4">
                            <div className="h-6 bg-primary/10 rounded-md w-20" />
                            <div className="grid grid-cols-3 gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="h-10 bg-primary/10 rounded-lg" />
                                ))}
                            </div>
                        </div>

                        {/* Add to cart button skeleton */}
                        <div className="h-14 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl" />

                        {/* Additional info skeleton */}
                        <div className="space-y-3">
                            <div className="h-4 bg-primary/10 rounded-md w-full" />
                            <div className="h-4 bg-primary/10 rounded-md w-4/5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="content-container my-16 small:my-32 relative">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-primary/10 rounded-md w-48" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-border/50 bg-secondary/20 overflow-hidden">
                                <div className="aspect-square bg-primary/10" />
                                <div className="p-4 space-y-3">
                                    <div className="h-5 bg-primary/10 rounded-md w-3/4" />
                                    <div className="h-4 bg-primary/10 rounded-md w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
