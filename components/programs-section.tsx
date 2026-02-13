"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Users, Sparkles, GraduationCap, Smartphone } from "lucide-react"

const programs = [
  {
    id: "crossfit",
    title: "CrossFit General",
    subtitle: "Comunidad y Fuerza",
    description: "Para todos los niveles. Entrenamiento funcional en grupo con el soporte de la comunidad.",
    icon: Users,
    featured: false,
    size: "large",
  },
  {
    id: "warrior-women",
    title: "Warrior Women",
    subtitle: "Rendimiento y Estética",
    description:
      "Fase metabólica + Bloque de hipertrofia enfocado en tren inferior. Salud y composición corporal real.",
    icon: Sparkles,
    featured: true,
    size: "medium",
  },
  {
    id: "beginners",
    title: "Principiantes",
    subtitle: "Aprendé a moverte",
    description: "Priorizamos la técnica y la base antes de la intensidad. Te convertimos en atleta paso a paso.",
    icon: GraduationCap,
    featured: false,
    size: "medium",
  },
  {
    id: "online",
    title: "Coaching Online",
    subtitle: "100% Personalizado",
    description:
      "Planificación por documento, feedback de técnica mediante video y contacto directo por WhatsApp/Mail. No sos un número en una app.",
    icon: Smartphone,
    featured: false,
    size: "large",
  },
]

export function ProgramsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="programs" className="py-20 md:py-32 bg-[#0a0a0a]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#dc2626] uppercase tracking-widest text-sm font-semibold mb-4">Programas</p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Elegí tu <span className="text-[#dc2626]">camino</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon
            const isLarge = program.size === "large"

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  group relative overflow-hidden rounded-lg p-6 md:p-8
                  transition-all duration-300 hover:scale-[1.02]
                  ${isLarge ? "lg:col-span-2" : ""}
                  ${
                    program.featured
                      ? "bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-2 border-[#eab308]/50 hover:border-[#eab308] hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                      : "bg-[#171717] border border-[#262626] hover:border-[#dc2626]/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
                  }
                `}
              >
                {/* Featured Badge */}
                {program.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#eab308] text-[#0a0a0a] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                      Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`
                  w-12 h-12 rounded flex items-center justify-center mb-6
                  ${program.featured ? "bg-[#eab308]/10" : "bg-[#dc2626]/10"}
                `}
                >
                  <Icon className={`w-6 h-6 ${program.featured ? "text-[#eab308]" : "text-[#dc2626]"}`} />
                </div>

                {/* Content */}
                <h3 className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">
                  {program.title}
                </h3>
                <p
                  className={`text-sm font-semibold uppercase tracking-wide mb-4 ${
                    program.featured ? "text-[#eab308]" : "text-[#dc2626]"
                  }`}
                >
                  {program.subtitle}
                </p>
                <p className="text-[#a3a3a3] leading-relaxed">{program.description}</p>

                {/* Hover accent line */}
                <div
                  className={`
                  absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
                  ${program.featured ? "bg-[#eab308]" : "bg-[#dc2626]"}
                `}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
