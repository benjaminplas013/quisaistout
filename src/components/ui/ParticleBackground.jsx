import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const particles = []
    const count = 60

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function Particle() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.1
    }

    function init() {
      particles.length = 0
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 20, 147, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }

    resize()
    init()
    animate()
    window.addEventListener('resize', () => { resize(); init() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
