"use client"

import { Heart, ArrowUp, Github, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const quickLinks = [
  { label: "Accueil", href: "#home" },
  { label: "A Propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Competences", href: "#skills" },
  { label: "Parcours", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-card border-t border-border relative">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25 hover:scale-110 transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <a href="#home" className="text-xl font-bold text-foreground inline-block mb-4 hover:scale-105 transition-transform">
                BEKKA Walid
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Developpeur Full-Stack et apprenti cybersecurite creant des experiences numeriques avec passion et precision.
              </p>
              
              {/* Contact Icons */}
              <div className="flex gap-3 mt-4">
                <a 
                  href="https://github.com/Walid0570" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:walidbekka345@gmail.com"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="tel:0636062020"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm inline-block hover:translate-x-1 duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Me Contacter</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary transition-colors">
                  <a href="mailto:walidbekka345@gmail.com">walidbekka345@gmail.com</a>
                </li>
                <li className="hover:text-primary transition-colors">
                  <a href="tel:0636062020">06 36 06 20 20</a>
                </li>
                <li>France</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> par BEKKA Walid
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Tous droits reserves.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
