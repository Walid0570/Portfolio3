"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = (scrolled / scrollHeight) * 100
      setScrollProgress(progress)
      setIsVisible(scrolled > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className={cn(
        "fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
      )}
    >
      {/* Name */}
      <div className="writing-vertical text-xs font-medium text-primary tracking-widest uppercase whitespace-nowrap mb-2">
        <span className="opacity-80">BEKKA Walid</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="relative h-48 w-1 bg-border/50 rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-accent rounded-full transition-all duration-150 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
        
        {/* Glow Effect */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50 transition-all duration-150 ease-out"
          style={{ bottom: `calc(${scrollProgress}% - 6px)` }}
        >
          <span className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
        </div>
      </div>
      
      {/* Percentage */}
      <div className="text-xs font-mono text-muted-foreground">
        {Math.round(scrollProgress)}%
      </div>

    </div>
  )
}
