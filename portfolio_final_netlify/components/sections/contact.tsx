"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Loader2, Github } from "lucide-react"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "walidbekka345@gmail.com",
    href: "mailto:walidbekka345@gmail.com",
  },
  {
    icon: Phone,
    label: "Telephone",
    value: "06 36 06 20 20",
    href: "tel:0636062020",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "France",
    href: "#",
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

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
    
    alert("Message envoye avec succes ! (Ceci est une demo)")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section ref={sectionRef} id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Prenons Contact
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Me Contacter
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vous avez un projet en tete ou souhaitez discuter d&apos;opportunites ? 
              N&apos;hesitez pas a me contacter. Je suis toujours ouvert aux nouvelles idees et collaborations.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className={cn(
              "lg:col-span-2 space-y-6 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <div className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Informations de Contact
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-start gap-4 group transition-all duration-500",
                        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* GitHub Link */}
              <div className={cn(
                "bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )} style={{ transitionDelay: "600ms" }}>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Retrouvez-moi sur GitHub
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Decouvrez mes projets et contributions open-source.
                </p>
                <a
                  href="https://github.com/Walid0570"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>@Walid0570</span>
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className={cn(
              "lg:col-span-3 transition-all duration-700 delay-400",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}>
              <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Envoyer un Message
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                      Votre Nom
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      required
                      className="bg-secondary/50 focus:bg-secondary transition-colors"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                      Votre Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@exemple.com"
                      required
                      className="bg-secondary/50 focus:bg-secondary transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mb-6 group">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Demande de projet"
                    required
                    className="bg-secondary/50 focus:bg-secondary transition-colors"
                  />
                </div>
                
                <div className="mb-6 group">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-moi de votre projet..."
                    rows={6}
                    required
                    className="bg-secondary/50 focus:bg-secondary resize-none transition-colors"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full group relative overflow-hidden"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Envoyer le Message
                    </>
                  )}
                  <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
