"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X, Home, Store, Ticket, HelpCircle } from "lucide-react"
import { Button } from "@components/ui/button"
import { motion } from "framer-motion"
import { HttpTypes } from "@medusajs/types"

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: Store },
  { name: "Claim Item", href: "https://discord.gg/Mt74ERXSpR", icon: Ticket, external: true },
  { name: "Help", href: "#faq", icon: HelpCircle },
]

interface HeaderProps {
  cart?: HttpTypes.StoreCart | null
}

export function Header({ cart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const itemCount = cart?.items?.length || 0

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img
                src="https://i.ibb.co/Qjd4QGFm/cooltext496272348833075.png"
                alt="PetShop Logo"
                className="h-12 w-auto"
              />
            </motion.div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 group flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  <span className="relative z-10">{link.name}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Enhanced Right Icons */}
          <div className="flex items-center space-x-2">
            <Link href="https://discord.gg/Mt74ERXSpR" aria-label="Join our Discord (opens in new tab)" target="_blank">
              <Button
                className="hidden lg:flex relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg shadow-primary/40"
              >
                <span className="relative z-10">Join Discord</span>
                <motion.span
                  className="absolute inset-0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "radial-gradient(120px 60px at 10% 50%, rgba(255,255,255,0.2), transparent), radial-gradient(120px 60px at 90% 50%, rgba(255,255,255,0.2), transparent)",
                  }}
                />
              </Button>
            </Link>
            <Link href="/account">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10 hover:text-primary transition-all duration-300"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold flex items-center justify-center shadow-lg shadow-primary/50"
                    aria-label={`${itemCount} items in cart`}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/20 py-4 bg-secondary/30 backdrop-blur-sm"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-2">
              <Link
                href="https://discord.gg/Mt74ERXSpR"
                target="_blank"
                className="mx-4 mb-2 rounded-md bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold px-4 py-3 text-center shadow-md shadow-primary/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Discord
              </Link>
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-md hover:bg-primary/10 flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
