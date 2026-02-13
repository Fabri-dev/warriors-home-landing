"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/language-context"

interface NavbarProps {
  onMobileMenuChange?: (isOpen: boolean) => void
}

export function Navbar({ onMobileMenuChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open)
    onMobileMenuChange?.(open)
  }

  const navLinks = [
    { href: "#coach", label: t("nav.coach") },
    { href: "#programs", label: t("nav.programs") },
    { href: "#schedule", label: t("nav.schedule") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ]

  const toggleLang = () => {
    setLang(lang === "es" ? "en" : ("es" as Language))
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626]" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-oswald)] text-xl md:text-2xl font-bold tracking-wider uppercase">
                {"Warrior's"} <span className="text-[#dc2626]">Home</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}

              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 text-sm font-medium text-[#a3a3a3] hover:text-[#fafafa] transition-colors uppercase tracking-wide cursor-pointer"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === "es" ? "EN" : "ES"}</span>
              </button>

              <Button
                asChild
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-[#fafafa] font-semibold uppercase tracking-wide"
              >
                <a href="#contact">{t("nav.cta")}</a>
              </Button>
            </div>

            {/* Mobile Menu Button + Lang Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLang}
                className="p-2 text-[#a3a3a3] hover:text-[#fafafa] min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleMobileMenu(!isMobileMenuOpen)}
                className="p-2 text-[#fafafa] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-lg md:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-center gap-8 p-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleMobileMenu(false)}
                  className="text-2xl font-[family-name:var(--font-oswald)] font-semibold text-[#fafafa] uppercase tracking-wider"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-[#fafafa] font-semibold uppercase tracking-wide min-h-[48px] px-8"
                  onClick={() => toggleMobileMenu(false)}
                >
                  <a href="#contact">{t("nav.cta")}</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
