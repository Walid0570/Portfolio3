"use client"

import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
}

interface Wave {
  amplitude: number
  frequency: number
  speed: number
  offset: number
  color: string
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
}

export function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const wavesRef = useRef<Wave[]>([])
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    for (let i = 0; i < 30; i++) {
      bubblesRef.current.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: 2 + Math.random() * 6,
        speed: 0.3 + Math.random() * 0.8,
        opacity: 0.1 + Math.random() * 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      })
    }

    wavesRef.current = [
      { amplitude: 30, frequency: 0.008, speed: 0.015, offset: 0, color: "rgba(59, 130, 246, 0.08)" },
      { amplitude: 25, frequency: 0.012, speed: 0.02, offset: Math.PI / 3, color: "rgba(96, 165, 250, 0.06)" },
      { amplitude: 20, frequency: 0.015, speed: 0.025, offset: Math.PI / 2, color: "rgba(147, 197, 253, 0.05)" },
      { amplitude: 15, frequency: 0.02, speed: 0.03, offset: Math.PI, color: "rgba(191, 219, 254, 0.04)" },
    ]

    for (let i = 0; i < 50; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.4,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
      })
    }

    const drawWave = (wave: Wave, yBase: number, time: number) => {
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = yBase + Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7) * wave.amplitude * 0.5
        ctx.lineTo(x, y)
      }
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fillStyle = wave.color
      ctx.fill()
    }

    const drawBubble = (bubble: Bubble) => {
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(
        bubble.x - bubble.size * 0.3, bubble.y - bubble.size * 0.3, 0,
        bubble.x, bubble.y, bubble.size
      )
      gradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity * 0.8})`)
      gradient.addColorStop(0.5, `rgba(147, 197, 253, ${bubble.opacity * 0.5})`)
      gradient.addColorStop(1, `rgba(59, 130, 246, ${bubble.opacity * 0.2})`)
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.beginPath()
      ctx.arc(bubble.x - bubble.size * 0.25, bubble.y - bubble.size * 0.25, bubble.size * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.6})`
      ctx.fill()
    }

    const drawParticle = (particle: Particle) => {
      const fadeOpacity = particle.opacity * Math.sin((particle.life / particle.maxLife) * Math.PI)
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(147, 197, 253, ${fadeOpacity})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(147, 197, 253, ${fadeOpacity * 0.3})`
      ctx.fill()
    }

    const drawLightRays = (time: number) => {
      const rayCount = 5
      for (let i = 0; i < rayCount; i++) {
        const x = (canvas.width / (rayCount + 1)) * (i + 1) + Math.sin(time * 0.001 + i) * 50
        const gradient = ctx.createLinearGradient(x, 0, x + 100, canvas.height)
        gradient.addColorStop(0, "rgba(147, 197, 253, 0.03)")
        gradient.addColorStop(0.5, "rgba(96, 165, 250, 0.015)")
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        ctx.beginPath()
        ctx.moveTo(x - 30, 0)
        ctx.lineTo(x + 70, 0)
        ctx.lineTo(x + 150, canvas.height)
        ctx.lineTo(x - 50, canvas.height)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.restore()
      }
    }

    const drawCaustics = (time: number) => {
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 8) * i + Math.sin(time * 0.02 + i * 0.5) * 30
        const y = canvas.height * 0.7 + Math.cos(time * 0.015 + i * 0.3) * 20
        const size = 80 + Math.sin(time * 0.03 + i) * 20
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, "rgba(147, 197, 253, 0.06)")
        gradient.addColorStop(0.5, "rgba(96, 165, 250, 0.03)")
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
      ctx.restore()
    }

    const animate = () => {
      timeRef.current += 1
      const time = timeRef.current
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawLightRays(time)
      wavesRef.current.forEach((wave, index) => {
        const yBase = canvas.height * 0.3 + index * 80
        drawWave(wave, yBase, time)
      })
      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speed
        bubble.wobble += bubble.wobbleSpeed
        bubble.x += Math.sin(bubble.wobble) * 0.5
        if (bubble.y < -20) {
          bubble.y = canvas.height + 20
          bubble.x = Math.random() * canvas.width
          bubble.size = 2 + Math.random() * 6
        }
        drawBubble(bubble)
      })
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.life += 1
        if (particle.life >= particle.maxLife ||
            particle.x < 0 || particle.x > canvas.width ||
            particle.y < 0 || particle.y > canvas.height) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
          particle.maxLife = 100 + Math.random() * 100
        }
        drawParticle(particle)
      })
      drawCaustics(time)
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationRef.current)
      } else {
        animate()
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("visibilitychange", handleVisibility)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  )
}
