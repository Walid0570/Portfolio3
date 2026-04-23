"use client"

import { useEffect, useRef, useState } from "react"
import { Code2, Zap, FolderGit2, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { icon: FolderGit2, value: 15, suffix: "+", label: "Projets Realises" },
  { icon: Users, value: 10, suffix: "+", label: "Clients Satisfaits" },
  { icon: Code2, value: 5000, suffix: "+", label: "Lignes de Code" },
  { icon: Zap, value: 100, suffix: "+", label: "Canettes de Redbull" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

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

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Apprenez a me connaitre
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              A Propos de Moi
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Image/Visual */}
            <div className={cn(
              "relative transition-all duration-1000 delay-200",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <div className="aspect-square max-w-md mx-auto relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                <div className="absolute inset-0 bg-accent/20 rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />
                <div className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10 h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center animate-pulse">
                      <span className="text-4xl font-bold text-primary">BW</span>
                    </div>
                    <p className="text-foreground font-semibold text-lg">BEKKA Walid</p>
                    <p className="text-primary text-sm mt-1">Developpeur Full-Stack</p>
                    <p className="text-accent text-sm">& Apprenti Cybersecurite</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className={cn(
              "transition-all duration-1000 delay-400",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Un developpeur Full-Stack et apprenti cybersecurite base en France
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Je suis un developpeur full-stack passionne par la creation d&apos;experiences 
                  numeriques belles, fonctionnelles et securisees. Actuellement en formation en 
                  cybersecurite, j&apos;allie mes competences en developpement web a une expertise 
                  croissante en securite informatique.
                </p>
                <p>
                  Mon parcours dans le developpement web a commence par une curiosite sur le 
                  fonctionnement d&apos;Internet. Aujourd&apos;hui, je me specialise dans la creation 
                  d&apos;applications web modernes et securisees utilisant des technologies comme React, 
                  Next.js, Node.js, et l&apos;integration de solutions d&apos;intelligence artificielle.
                </p>
                <p>
                  Quand je ne code pas, vous me trouverez en train d&apos;explorer de nouvelles 
                  technologies, de contribuer a des projets open-source ou de parfaire mes 
                  connaissances en cybersecurite.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Disponible pour des missions freelance</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-card rounded-xl p-6 text-center border border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
