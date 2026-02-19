"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { communityMedia } from "@/lib/community-media"

const IMAGE_INTERVAL = 5000 // ms for image slides

function isVideo(path: string) {
  return /\.(mp4|webm|ogg)$/i.test(path)
}

export function CommunitySection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const media = communityMedia
  const total = media.length

  // Advance to next slide
  const advance = useCallback(() => {
    setDirection(1)
    setIndex((prev) => (prev + 1) % total)
  }, [total])

  // Start image interval — only used for non-video slides
  const startImageTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, IMAGE_INTERVAL)
  }, [advance])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Whenever the slide changes, decide how to time the next advance
  useEffect(() => {
    stopTimer()
    if (!isVideo(media[index])) {
      startImageTimer()
    }
    // For video slides: the <video> onEnded handler calls advance()
    return () => stopTimer()
  }, [index, media, startImageTimer, stopTimer, isVideo])

  const goTo = useCallback(
    (newIndex: number, dir: number) => {
      // Pause current video if navigating away manually
      if (videoRef.current) {
        videoRef.current.pause()
      }
      setDirection(dir)
      setIndex((newIndex + total) % total)
    },
    [total]
  )

  const prev = () => goTo(index - 1, -1)
  const next = () => goTo(index + 1, 1)

  // Drag / swipe support
  const dragStart = useRef(0)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStart.current = "touches" in e ? e.touches[0].clientX : e.clientX
  }
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX
    const delta = dragStart.current - endX
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev()
    }
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  if (!total) return null

  const current = media[index]

  return (
    <section
      id="community"
      ref={ref}
      className="py-20 md:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#dc2626] uppercase tracking-widest text-sm font-semibold mb-4">
            {t("community.label")}
          </p>
          <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
            {t("community.headline1")}
            <span className="text-[#dc2626]"> {t("community.headline2")}</span>
          </h2>
          <p className="mt-4 text-[#a3a3a3] text-lg max-w-2xl mx-auto">
            {t("community.sub")}
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Media container */}
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm bg-[#111111] select-none"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
          >
            {/* Red accent corners */}
            <div className="absolute top-0 left-0 w-16 h-0.5 bg-[#dc2626] z-20" />
            <div className="absolute top-0 left-0 w-0.5 h-16 bg-[#dc2626] z-20" />
            <div className="absolute bottom-0 right-0 w-16 h-0.5 bg-[#dc2626] z-20" />
            <div className="absolute bottom-0 right-0 w-0.5 h-16 bg-[#dc2626] z-20" />

            {/* Dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/20 z-10 pointer-events-none" />

            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {isVideo(current) ? (
                  <video
                    ref={videoRef}
                    src={current}
                    autoPlay
                    muted
                    playsInline
                    // Do NOT loop — we need the ended event to fire
                    onEnded={advance}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={current}
                    alt={`Warriors Home community moment ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Slide anterior"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/70 border border-[#262626] flex items-center justify-center text-[#fafafa] hover:bg-[#dc2626] hover:border-[#dc2626] transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente slide"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/70 border border-[#262626] flex items-center justify-center text-[#fafafa] hover:bg-[#dc2626] hover:border-[#dc2626] transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === index
                    ? "bg-[#dc2626] w-6 h-2"
                    : "bg-[#525252] hover:bg-[#a3a3a3] w-2 h-2"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
