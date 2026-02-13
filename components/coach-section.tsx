"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Trophy, Award } from "lucide-react"

export function CoachSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="coach" className="py-20 md:py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#dc2626]/20 to-transparent z-10" />
              <img
                src="/placeholder.svg?height=800&width=640"
                alt="Coach Coti del Ferrero"
                className="w-full h-full object-cover"
              />
              {/* Red accent border */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#dc2626]" />
              <div className="absolute bottom-0 left-0 w-1 h-32 bg-[#dc2626]" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-[#dc2626] uppercase tracking-widest text-sm font-semibold mb-2">Head Coach</p>
              <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
                Rodrigo "Coti"
                <br />
                <span className="text-[#a3a3a3]">del Ferrero</span>
              </h2>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[#171717] border border-[#eab308]/30 px-4 py-2 rounded">
                <Trophy className="w-5 h-5 text-[#eab308]" />
                <span className="text-sm font-medium text-[#eab308]">
                  Southfit Challenge Elite Individual - 2do Puesto
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#171717] border border-[#262626] px-4 py-2 rounded">
                <Award className="w-5 h-5 text-[#fafafa]" />
                <span className="text-sm font-medium">CrossFit Coach & Athlete</span>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-[#dc2626] pl-6 py-2">
              <p className="text-lg md:text-xl text-[#a3a3a3] leading-relaxed italic">
                "Detrás de cada avance hay constancia. Mi trabajo es ajustar detalles y corregir movimientos para que
                saques el mayor jugo a tu entrenamiento."
              </p>
            </blockquote>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-[#171717] rounded">
                <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#dc2626]">8+</p>
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mt-1">Años exp.</p>
              </div>
              <div className="text-center p-4 bg-[#171717] rounded">
                <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#dc2626]">500+</p>
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mt-1">Atletas</p>
              </div>
              <div className="text-center p-4 bg-[#171717] rounded">
                <p className="font-[family-name:var(--font-oswald)] text-3xl font-bold text-[#eab308]">Top 2</p>
                <p className="text-xs text-[#a3a3a3] uppercase tracking-wide mt-1">Southfit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
