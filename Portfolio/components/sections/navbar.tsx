"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Accueil", href: "#home" },
  { label: "A Propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Competences", href: "#skills" },
  { label: "Parcours", href: "#experience" },
  { label: "Temoignages", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      setIsScrolled(currentScrollY > 50)
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
      
      const sections = navItems.map(item => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5" 
          : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="#home" 
            className="text-lg font-bold text-primary group transition-all duration-300 hover:scale-105"
          >
            <span className="relative text-foreground">
              BEKKA Walid
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                  activeSection === item.href.slice(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
                <span 
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                    activeSection === item.href.slice(1) ? "w-1/2" : "w-0 group-hover:w-1/3"
                  )}
                />
              </a>
            ))}
          </div>
          
          <div className="hidden lg:block">
            <Button asChild className="group relative overflow-hidden">
              <a href="#contact">
                <span className="relative z-10">Me Recruter</span>
                <span className="absolute inset-0 bg-accent/30 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </a>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu className={cn(
                "w-5 h-5 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              )} />
              <X className={cn(
                "w-5 h-5 absolute inset-0 transition-all duration-300",
                isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              )} />
            </div>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Button className="mt-4" asChild>
                <a href="#contact">Me Recruter</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
