"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Alexandre Amico",
    role: "Directeur de My Securitech",
    content: "La fiabilite est primordiale dans notre secteur de la securite. Ce developpeur a demontre un serieux sans faille et un professionnalisme exemplaire. Les solutions qu'il a developpees pour nous sont robustes, securisees et parfaitement adaptees a nos besoins critiques. Nous lui faisons entierement confiance.",
    avatar: "AA",
  },
  {
    id: 2,
    name: "Sofiane Messaoudene",
    role: "Patron de Biborne",
    content: "L'innovation et la reactivite de ce developpeur ont transforme notre approche des services. Il a su traduire nos besoins en solutions modernes et efficaces qui ont directement impact la croissance de notre activite. Un partenaire de qualite en qui nous avons totale confiance pour nos futurs projets.",
    avatar: "SM",
  },
  {
    id: 3,
    name: "Fouzi ISSAD",
    role: "Directeur de Atmos Dev",
    content: "Une expertise technique exceptionnelle combinee a un accompagnement veritablement sur mesure. Il a transforme nos projets les plus complexes en solutions elegantes et performantes. La qualite des resultats obtenus depasse systematiquement nos attentes. Hautement recommande pour tout developpement d'envergure.",
    avatar: "FI",
  },
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

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Retours Clients
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Ce Qu&apos;ils Disent
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          {/* Testimonial Carousel */}
          <div className={cn(
            "relative transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center relative shadow-xl shadow-primary/5">
                      {/* Quote Icon */}
                      <div className="absolute top-6 left-6 text-primary/20">
                        <Quote className="w-12 h-12 animate-pulse" />
                      </div>
                      
                      {/* Avatar */}
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-4 ring-primary/10">
                        <span className="text-2xl font-bold text-primary">
                          {testimonial.avatar}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed max-w-2xl mx-auto">
                        &laquo; {testimonial.content} &raquo;
                      </blockquote>
                      
                      {/* Author */}
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex hover:scale-110 transition-transform shadow-lg"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex hover:scale-110 transition-transform shadow-lg"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  currentIndex === index 
                    ? "bg-primary w-8" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                )}
                aria-label={`Aller au temoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
