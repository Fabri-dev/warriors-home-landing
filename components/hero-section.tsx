"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="parallax-bg absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/60 to-[#0a0a0a]" />

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-balance">
            {t("hero.headline1")}
            <br />
            <span className="text-[#dc2626]">{t("hero.headline2")}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 md:mt-8 text-lg md:text-xl text-[#a3a3a3] max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          {t("hero.sub1")}
          <span className="text-[#fafafa] font-medium">{t("hero.sub2")}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-[#fafafa] font-[family-name:var(--font-oswald)] font-bold text-lg uppercase tracking-wider px-8 py-6 min-h-[56px] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
          >
            <a href="#contact">{t("hero.cta")}</a>
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
          <ChevronDown className="w-8 h-8 text-[#a3a3a3]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
