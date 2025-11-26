"use client"

import * as React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@lib/util/ui"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error"
  duration?: number
  onClose?: () => void
}

const Toast = ({ id, title, description, variant = "default", onClose }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all",
        variant === "success" && "border-green-500 bg-green-50 dark:bg-green-950/20",
        variant === "error" && "border-red-500 bg-red-50 dark:bg-red-950/20",
        variant === "default" && "border bg-card"
      )}
    >
      <div className="grid gap-1">
        {title && (
          <div className={cn(
            "text-sm font-semibold",
            variant === "success" && "text-green-900 dark:text-green-100",
            variant === "error" && "text-red-900 dark:text-red-100"
          )}>
            {title}
          </div>
        )}
        {description && (
          <div className={cn(
            "text-sm opacity-90",
            variant === "success" && "text-green-800 dark:text-green-200",
            variant === "error" && "text-red-800 dark:text-red-200"
          )}>
            {description}
          </div>
        )}
      </div>
      <button
        className={cn(
          "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
          variant === "success" && "text-green-600 hover:text-green-700",
          variant === "error" && "text-red-600 hover:text-red-700"
        )}
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

interface ToastContextType {
  toasts: ToastProps[]
  showToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const showToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(7)
    const newToast = { ...toast, id }
    setToasts((prev) => [...prev, newToast])

    if (toast.duration !== 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, toast.duration || 3000)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto mb-2">
              <Toast {...toast} onClose={() => removeToast(toast.id)} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

