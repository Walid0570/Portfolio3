"use client"

import { useRef, useState, useEffect } from "react"
import { Briefcase, GraduationCap, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    type: "work",
    title: "Developpeur Full-Stack Freelance",
    company: "Independant",
    description: "Developpement d'applications web sur mesure pour des clients varies. Specialisation en React, Next.js et Node.js avec integration d'IA.",
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "OpenAI"],
  },
  {
    type: "work",
    title: "Stage chez Qweeby",
    company: "Qweeby",
    description: "Stage qui m'a apporte un apprentissage approfondi sur les expressions regulieres (Regex). Les Regex sont un langage formel utilise pour rechercher et manipuler du texte base sur des motifs (patterns). Elles permettent de valider, extraire ou remplacer des chaines de caracteres selon des regles precises, essentiel pour le traitement de donnees et la validation d'entrees utilisateur.",
    technologies: ["Regex", "JavaScript", "Python"],
  },
  {
    type: "work",
    title: "Stage chez Atmos Dev",
    company: "Atmos Dev",
    description: "Stage qui m'a appris a gerer le logiciel Leo2. Leo2 est un logiciel de gestion integre pour les auto-ecoles, permettant la gestion administrative, pedagogique et commerciale des etablissements. J'ai acquis des competences en gestion de donnees, interface utilisateur et optimisation des processus.",
    technologies: ["Leo2", "Gestion de donnees", "Interface utilisateur"],
  },
  {
    type: "work",
    title: "Stage chez Biborne",
    company: "Biborne",
    description: "Stage qui m'a initie au systeme Biborne. Biborne est un systeme de gestion de bibliotheque numerique, facilitant le catalogage, le pret et la gestion des ressources documentaires. J'ai developpe des competences en organisation de l'information, recherche et gestion de bases de donnees documentaires.",
    technologies: ["Biborne", "Gestion documentaire", "Bases de donnees"],
  },
  {
    type: "education",
    title: "BTS SIO Option SLAM",
    company: "Lycee Simone Weil, Saint-Priest en Jarez",
    description: "Services Informatiques aux Organisations, option Solutions Logicielles et Applications Metiers. Formation complete en developpement d'applications et gestion de projets informatiques.",
    technologies: ["Java", "PHP", "SQL", "HTML/CSS", "JavaScript"],
  },
  {
    type: "education",
    title: "Bac Pro Systeme Numerique RISC",
    company: "Lycee Pierre Desgranges, Andrezieux-Boutheon",
    description: "Baccalaureat Professionnel Systemes Numeriques option Reseaux Informatiques et Systemes Communicants. Formation aux fondamentaux des reseaux, systemes et maintenance informatique.",
    technologies: ["Reseaux", "Systemes", "Maintenance", "Electronique"],
  },
  {
    type: "certification",
    title: "Certifications FreeCodeCamp",
    company: "FreeCodeCamp.org",
    description: "Responsive Web Design, JavaScript Algorithms and Data Structures, Front End Development Libraries. Apprentissage approfondi des technologies web modernes.",
    technologies: ["HTML/CSS", "JavaScript", "React", "Algorithmes"],
  },
  {
    type: "certification",
    title: "Formation Cybersecurite",
    company: "En cours",
    description: "Apprentissage des fondamentaux de la cybersecurite : tests de penetration, securite des applications web, cryptographie et bonnes pratiques OWASP.",
    technologies: ["OWASP", "Pentest", "Cryptographie", "Linux"],
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

export function Experience() {
  const workExperiences = experiences.filter(exp => exp.type === "work")
  const educationExperiences = experiences.filter(exp => exp.type === "education" || exp.type === "certification")
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase
      case "education":
        return GraduationCap
      case "certification":
        return Award
      default:
        return Briefcase
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-primary/10 group-hover:bg-primary/20 text-primary"
      case "education":
        return "bg-accent/10 group-hover:bg-accent/20 text-accent"
      case "certification":
        return "bg-green-500/10 group-hover:bg-green-500/20 text-green-500"
      default:
        return "bg-primary/10 group-hover:bg-primary/20 text-primary"
    }
  }

  return (
    <section ref={sectionRef} id="experience" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-20 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Mon Parcours
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Expérience Professionnelle
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Timeline Expérience Horizontale */}
          <div className="relative mb-32">
            {/* Timeline Line Horizontale */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/50 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {workExperiences.map((exp, index) => {
                const IconComponent = getIcon(exp.type)
                return (
                  <div
                    key={`work-${index}`}
                    className={cn(
                      "relative transition-all duration-700 group",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${200 + index * 150}ms` }}
                  >
                    {/* Timeline Dot - Visible seulement sur desktop */}
                    <div className="hidden md:block absolute -top-2 left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 z-10 shadow-lg bg-primary shadow-primary/50">
                      <span className="absolute inset-0 rounded-full animate-ping opacity-25 bg-primary" />
                    </div>

                    {/* Content Card */}
                    <div className={cn(
                      "bg-card rounded-xl p-6 border transition-all duration-500 hover:shadow-xl group hover:-translate-y-2 h-full border-primary/20 hover:border-primary/50 hover:shadow-primary/5"
                    )}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-primary/10 group-hover:bg-primary/20 text-primary"
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-medium text-primary">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Section Formations */}
          <div className={cn(
            "text-center mb-20 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Formations & Certifications
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Timeline Formations Horizontale */}
          <div className="relative">
            {/* Timeline Line Horizontale */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent to-green-500 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
              {educationExperiences.map((exp, index) => {
                const IconComponent = getIcon(exp.type)
                return (
                  <div
                    key={`edu-${index}`}
                    className={cn(
                      "relative transition-all duration-700 group",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                    style={{ transitionDelay: `${200 + (workExperiences.length + index) * 150}ms` }}
                  >
                    {/* Timeline Dot - Visible seulement sur desktop */}
                    <div
                      className={cn(
                        "hidden md:block absolute -top-2 left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 z-10 shadow-lg",
                        exp.type === 'education' ? "bg-accent shadow-accent/50" : "bg-green-500 shadow-green-500/50"
                      )}
                    >
                      <span className="absolute inset-0 rounded-full animate-ping opacity-25"
                            style={{ backgroundColor: exp.type === 'education' ? 'rgb(var(--accent))' : 'rgb(34, 197, 94)' }} />
                    </div>

                    {/* Content Card */}
                    <div className={cn(
                      "bg-card rounded-xl p-6 border transition-all duration-500 hover:shadow-xl group hover:-translate-y-2 h-full",
                      exp.type === 'education' ? "border-accent/20 hover:border-accent/50 hover:shadow-accent/5" :
                      "border-green-500/20 hover:border-green-500/50 hover:shadow-green-500/5"
                    )}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                          exp.type === 'education' ? "bg-accent/10 group-hover:bg-accent/20 text-accent" : "bg-green-500/10 group-hover:bg-green-500/20 text-green-500"
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {exp.title}
                          </h3>
                          <p className={cn(
                            "text-sm font-medium",
                            exp.type === 'education' ? "text-accent" : "text-green-500"
                          )}>
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={cn(
                              "text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105",
                              exp.type === 'education' ? "bg-accent/10 text-accent hover:bg-accent/20" :
                              "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
