"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ScheduleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const schedule = [
    { time: "13:00", labelKey: "schedule.noon" },
    { time: "14:00", labelKey: "schedule.siesta" },
    { time: "18:00", labelKey: "schedule.afternoon" },
    { time: "19:00", labelKey: "schedule.primetime" },
    { time: "20:00", labelKey: "schedule.night" },
  ]

  return (
    <section id="schedule" className="py-20 md:py-32 bg-[#171717]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Schedule */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#dc2626] uppercase tracking-widest text-sm font-semibold mb-4">{t("schedule.label")}</p>
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
              {t("schedule.headline1")}<span className="text-[#dc2626]">{t("schedule.headline2")}</span>
            </h2>

            <div className="space-y-4">
              {schedule.map((slot, index) => (
                <motion.div
                  key={slot.time}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex items-center gap-3 bg-[#0a0a0a] px-4 py-3 rounded min-w-[100px] border border-[#262626] group-hover:border-[#dc2626]/50 transition-colors">
                    <Clock className="w-4 h-4 text-[#dc2626]" />
                    <span className="font-[family-name:var(--font-oswald)] text-xl font-bold">{slot.time}</span>
                  </div>
                  <span className="text-[#a3a3a3] text-sm uppercase tracking-wide">{t(slot.labelKey)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Location */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg overflow-hidden">
              {/* Map placeholder */}
              <div className="aspect-video bg-[#171717] relative">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Ubicación Mar del Plata"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#dc2626] p-4 rounded-full animate-pulse">
                    <MapPin className="w-8 h-8 text-[#fafafa]" />
                  </div>
                </div>
              </div>

              {/* Location info */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#dc2626]/10 p-3 rounded">
                    <MapPin className="w-6 h-6 text-[#dc2626]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase mb-1">
                      {t("schedule.location")}
                    </h3>
                    <p className="text-[#a3a3a3]">{t("schedule.country")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#dc2626]/30 rounded-tr-lg" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#dc2626]/30 rounded-bl-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
