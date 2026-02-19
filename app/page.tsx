"use client"

import { useState } from "react"
import { LanguageProvider } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CoachSection } from "@/components/coach-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ProgramsSection } from "@/components/programs-section"
import { ScheduleSection } from "@/components/schedule-section"
import { FaqSection } from "@/components/faq-section"
import { ContactFooter } from "@/components/contact-footer"
import { BackToTop } from "@/components/back-to-top"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navbar onMobileMenuChange={setIsMobileMenuOpen} />
        <HeroSection />
        <CoachSection />
        <PhilosophySection />
        <ProgramsSection />
        <ScheduleSection />
        <FaqSection />
        <ContactFooter />
        <BackToTop isMobileMenuOpen={isMobileMenuOpen} />
      </main>
    </LanguageProvider>
  )
}
