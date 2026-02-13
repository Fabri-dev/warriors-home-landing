"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function PhilosophySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Parallax Background */}
      <div
        className="parallax-bg absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]/80" />

      {/* Red accent lines */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#dc2626] uppercase tracking-[0.3em] text-sm font-semibold mb-6">Nuestra Filosofía</p>

          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight text-balance">
            La técnica <span className="text-[#dc2626]">no se negocia.</span>
          </h2>

          <p className="mt-8 text-xl md:text-2xl text-[#a3a3a3] leading-relaxed max-w-2xl mx-auto">
            No se trata solo de moverse, sino de construir bases sólidas desde el primer día.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
