"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const roles = [
  "Developpeur Full-Stack",
  "Apprenti Cybersecurite",
  "Createur d'Experiences Web",
  "Passione d'IA",
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  
  return isInView
}

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--primary)_0%,transparent_50%)] opacity-15 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--accent)_0%,transparent_50%)] opacity-10 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_30%)] opacity-5" />
      </div>
      
      {/* Floating Orbs with Animation */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[80px] animate-float-slow" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p 
            className={cn(
              "text-primary font-medium mb-4 tracking-wider uppercase text-sm transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Bienvenue sur mon portfolio
          </p>
          
          <h1 
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-700 delay-100",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-primary relative inline-block">
              BEKKA Walid
              <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-primary/60 rounded-full animate-scale-x" />
            </span>
          </h1>
          
          <div 
            className={cn(
              "h-12 md:h-16 flex items-center justify-center mb-8 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-xl md:text-3xl text-muted-foreground font-mono">
              {displayText}
              <span className="animate-blink text-primary">|</span>
            </span>
          </div>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty transition-all duration-700 delay-300",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Developpeur Full-Stack et apprenti en cybersecurite. Je cree des experiences numeriques exceptionnelles 
            avec un code propre et des solutions innovantes integrant l&apos;intelligence artificielle.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-400",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <Button size="lg" className="text-lg px-8 group relative overflow-hidden" asChild>
              <a href="#projects">
                <span className="relative z-10">Voir Mes Projets</span>
                <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 group border-primary/50 hover:border-primary hover:bg-primary/10" asChild>
              <a href="#contact">Me Contacter</a>
            </Button>
          </div>
          
          <div 
            className={cn(
              "flex items-center justify-center gap-4 transition-all duration-700 delay-500",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <a 
              href="https://github.com/Walid0570" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </a>
            <a 
              href="mailto:walidbekka345@gmail.com"
              className="p-3 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </a>
            <a 
              href="tel:0636062020"
              className="p-3 rounded-full bg-secondary/80 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-primary/25"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors animate-bounce-slow">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
      
    </section>
  )
}
