"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Animated card container */}
      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Glassmorphism card */}
        <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />

          {/* Content */}
          <div className="relative">
            {currentView === "sign-in" ? (
              <Login setCurrentView={setCurrentView} />
            ) : (
              <Register setCurrentView={setCurrentView} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
