"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const baseSkills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 88 },
  { name: "TypeScript", level: 85 },
  { name: "Regex", level: 80 },
  { name: "Python", level: 82 },
  { name: "PHP", level: 75 },
  { name: "MySQL", level: 78 },
]

const frameworks = [
  { name: "Next.js", level: 95 },
  { name: "React", level: 92 },
  { name: "Vue.js", level: 75 },
  { name: "Laravel", level: 70 },
  { name: "Tailwind", level: 95 },
]

const tools = [
  { name: "Vercel", level: 85 },
  { name: "Git/GitHub", level: 90 },
  { name: "Docker", level: 75 },
  { name: "VS Code/PHP Storm", level: 95 },
  { name: "Supabase", level: 80 },
  { name: "PostgreSQL", level: 82 },
]

function SkillBar({ name, level, delay = 0, color = "from-primary to-accent" }: { name: string; level: number; delay?: number; color?: string }) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          setTimeout(() => setWidth(level), delay)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [level, delay, hasAnimated])

  return (
    <div ref={ref} className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</span>
        <span className="text-sm text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden relative">
        <div 
          className={cn("h-full bg-gradient-to-r rounded-full transition-all duration-1000 ease-out relative", color)}
          style={{ width: `${width}%` }}
        >
          <span className="absolute right-0 top-0 h-full w-2 bg-white/40 animate-pulse rounded-full" />
        </div>
        {/* Animated glow */}
        <div 
          className="absolute top-0 left-0 h-full bg-primary/20 blur-sm rounded-full transition-all duration-1000"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function CircularProgress({ level, label, delay = 0 }: { level: number; label: string; delay?: number }) {
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progress / 100) * circumference

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1000
          const steps = 60
          const increment = level / steps
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= level) {
              setProgress(level)
              clearInterval(timer)
            } else {
              setProgress(Math.floor(current))
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
  }, [level, delay, hasAnimated])

  return (
    <div ref={ref} className="flex flex-col items-center group">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-secondary"
          />
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
        </div>
      </div>
      <span className="mt-3 text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors">{label}</span>
    </div>
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

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef)

  return (
    <section ref={sectionRef} id="skills" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={cn(
            "text-center mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <p className="text-primary font-medium mb-2 tracking-wider uppercase text-sm">
              Ce que je maitrise
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Competences & Technologies
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          {/* Skills Grid - Progress Bars */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Compétences de base */}
            <div className={cn(
              "bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )} style={{ transitionDelay: "200ms" }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                Compétences de base
              </h3>
              <SkillBar name="HTML" level={95} delay={0} />
              <SkillBar name="CSS" level={90} delay={100} />
              <SkillBar name="JavaScript" level={88} delay={200} />
              <SkillBar name="TypeScript" level={85} delay={300} />
              <SkillBar name="Regex" level={80} delay={400} />
              <SkillBar name="Python" level={82} delay={500} />
              <SkillBar name="PHP" level={75} delay={600} />
              <SkillBar name="MySQL" level={78} delay={700} />
            </div>
            
            {/* Frameworks */}
            <div className={cn(
              "bg-card rounded-xl p-8 border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-y-12"
            )} style={{ transitionDelay: "400ms" }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                Frameworks
              </h3>
              <SkillBar name="Next.js" level={95} delay={0} color="from-accent to-primary" />
              <SkillBar name="React" level={92} delay={100} color="from-accent to-primary" />
              <SkillBar name="Vue.js" level={75} delay={200} color="from-accent to-primary" />
              <SkillBar name="Laravel" level={70} delay={300} color="from-accent to-primary" />
              <SkillBar name="Tailwind" level={95} delay={400} color="from-accent to-primary" />
            </div>

            {/* Outils */}
            <div className={cn(
              "bg-card rounded-xl p-8 border border-border hover:border-green-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/5",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )} style={{ transitionDelay: "600ms" }}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                Outils
              </h3>
              <SkillBar name="Vercel" level={85} delay={0} color="from-green-500 to-primary" />
              <SkillBar name="Git/GitHub" level={90} delay={100} color="from-green-500 to-primary" />
              <SkillBar name="Docker" level={75} delay={200} color="from-green-500 to-primary" />
              <SkillBar name="VS Code/PHP Storm" level={95} delay={300} color="from-green-500 to-primary" />
              <SkillBar name="Supabase" level={80} delay={400} color="from-green-500 to-primary" />
              <SkillBar name="PostgreSQL" level={82} delay={500} color="from-green-500 to-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
