import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CoachSection } from "@/components/coach-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ProgramsSection } from "@/components/programs-section"
import { ScheduleSection } from "@/components/schedule-section"
import { ContactFooter } from "@/components/contact-footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <CoachSection />
      <PhilosophySection />
      <ProgramsSection />
      <ScheduleSection />
      <ContactFooter />
    </main>
  )
}
