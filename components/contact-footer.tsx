"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram, MessageCircle, CheckCircle, AlertCircle, Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"

const INSTAGRAM_USERNAME = "warriors.home_"

interface FormData {
  name: string
  phone: string
  experience: string
  presencial: boolean
  online: boolean
}

interface FormErrors {
  name?: string
  phone?: string
  experience?: string
  goal?: string
}

function buildInstagramMessage(data: FormData): string {
  const modality = [data.presencial && "Presencial", data.online && "Online"]
    .filter(Boolean)
    .join(" + ")

  const experienceLabel: Record<string, string> = {
    principiante: "Principiante (0-6 meses)",
    intermedio: "Intermedio (6 meses - 2 años)",
    avanzado: "Avanzado (2+ años)",
  }

  return [
    `¡Hola! Me interesa unirme a Warrior's Home 🥊`,
    ``,
    `• Nombre: ${data.name}`,
    `• WhatsApp: ${data.phone}`,
    `• Nivel: ${experienceLabel[data.experience] ?? data.experience}`,
    `• Modalidad: ${modality}`,
  ].join("\n")
}

export function ContactFooter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    experience: "",
    presencial: false,
    online: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedMessage, setCopiedMessage] = useState("")
  const [justCopied, setJustCopied] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.error.name")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contact.form.error.phone")
    } else if (!/^[\d\s\-+()]{8,}$/.test(formData.phone)) {
      newErrors.phone = t("contact.form.error.phone.invalid")
    }

    if (!formData.experience) {
      newErrors.experience = t("contact.form.error.experience")
    }

    if (!formData.presencial && !formData.online) {
      newErrors.goal = t("contact.form.error.goal")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setJustCopied(true)
      setTimeout(() => setJustCopied(false), 2000)
    } catch {
      // fallback: select a textarea
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const message = buildInstagramMessage(formData)
    // Copy message to clipboard before opening Instagram
    // (Instagram Web ignores the ?text= param on desktop)
    await copyToClipboard(message)
    setCopiedMessage(message)

    const url = `https://ig.me/m/${INSTAGRAM_USERNAME}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setFormData({ name: "", phone: "", experience: "", presencial: false, online: false })
    setErrors({})
    setIsSubmitted(false)
    setCopiedMessage("")
  }

  return (
    <footer id="contact" className="py-12 md:py-20 bg-[#0a0a0a] cursor-default" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[#dc2626] uppercase tracking-widest text-sm font-semibold mb-6">{t("contact.label")}</p>
            <h2 className="font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
              {t("contact.headline1")}
              <br />
              <span className="text-[#dc2626]">{t("contact.headline2")}</span>
            </h2>

            <blockquote className="mt-8 border-l-4 border-[#dc2626] pl-6 py-2">
              <p className="text-xl md:text-2xl text-[#a3a3a3] italic leading-relaxed">
                {'"'}{t("contact.quote")}{'"'}
              </p>
            </blockquote>

            {/* Social */}
            <div className="mt-12">
              <a
                href={`https://instagram.com/${INSTAGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#a3a3a3] hover:text-[#fafafa] transition-colors group"
              >
                <div className="bg-[#171717] p-3 rounded group-hover:bg-[#dc2626]/20 transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="font-medium">@{INSTAGRAM_USERNAME}</span>
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="bg-[#171717] border border-[#262626] rounded-lg p-6 md:p-8 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#dc2626]/10 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#dc2626]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase">
                      {t("contact.form.success.title")}
                    </h3>
                    <p className="text-[#a3a3a3] text-sm mt-0.5">{t("contact.form.success.text")}</p>
                  </div>
                </div>

                {/* Message preview */}
                <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-4">
                  <p className="text-[#525252] text-xs uppercase tracking-wider mb-2">{t("contact.form.success.message_label")}</p>
                  <pre className="text-[#a3a3a3] text-sm whitespace-pre-wrap font-sans leading-relaxed">{copiedMessage}</pre>
                </div>

                {/* Copy again button */}
                <button
                  onClick={() => copyToClipboard(copiedMessage)}
                  className="w-full flex items-center justify-center gap-2 border border-[#262626] hover:border-[#dc2626] text-[#a3a3a3] hover:text-[#fafafa] rounded-lg py-3 text-sm transition-all duration-200"
                >
                  {justCopied ? (
                    <><Check className="w-4 h-4 text-[#dc2626]" /> {t("contact.form.success.copied")}</>
                  ) : (
                    <><Copy className="w-4 h-4" /> {t("contact.form.success.copy_again")}</>
                  )}
                </button>

                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="w-full flex items-center justify-center gap-2 bg-[#262626] hover:bg-[#dc2626] text-[#fafafa] rounded-lg py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t("contact.form.success.another")}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#171717] border border-[#262626] rounded-lg p-6 md:p-8 space-y-6"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm uppercase tracking-wide">
                    {t("contact.form.name")}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t("contact.form.name.placeholder")}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    className={`bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder:text-[#525252] min-h-[48px] ${
                      errors.name ? "border-[#dc2626] focus-visible:ring-[#dc2626]" : "focus-visible:ring-[#dc2626]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[#dc2626] text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm uppercase tracking-wide">
                    {t("contact.form.phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t("contact.form.phone.placeholder")}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: undefined })
                    }}
                    className={`bg-[#0a0a0a] border-[#262626] text-[#fafafa] placeholder:text-[#525252] min-h-[48px] ${
                      errors.phone ? "border-[#dc2626] focus-visible:ring-[#dc2626]" : "focus-visible:ring-[#dc2626]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[#dc2626] text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm uppercase tracking-wide">
                    {t("contact.form.experience")}
                  </Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => {
                      setFormData({ ...formData, experience: value })
                      if (errors.experience) setErrors({ ...errors, experience: undefined })
                    }}
                  >
                    <SelectTrigger
                      className={`bg-[#0a0a0a] border-[#262626] text-[#fafafa] min-h-[48px] ${
                        errors.experience ? "border-[#dc2626]" : ""
                      }`}
                    >
                      <SelectValue placeholder={t("contact.form.experience.placeholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] border-[#262626]">
                      <SelectItem
                        value="principiante"
                        className="text-[#fafafa] focus:bg-[#262626] focus:text-[#fafafa]"
                      >
                        {t("contact.form.exp.beginner")}
                      </SelectItem>
                      <SelectItem value="intermedio" className="text-[#fafafa] focus:bg-[#262626] focus:text-[#fafafa]">
                        {t("contact.form.exp.intermediate")}
                      </SelectItem>
                      <SelectItem value="avanzado" className="text-[#fafafa] focus:bg-[#262626] focus:text-[#fafafa]">
                        {t("contact.form.exp.advanced")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-[#dc2626] text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Goal Checkboxes */}
                <div className="space-y-3">
                  <Label className="text-sm uppercase tracking-wide">{t("contact.form.mode")}</Label>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="presencial"
                        checked={formData.presencial}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, presencial: checked as boolean })
                          if (errors.goal) setErrors({ ...errors, goal: undefined })
                        }}
                        className="border-[#262626] data-[state=checked]:bg-[#dc2626] data-[state=checked]:border-[#dc2626] w-5 h-5"
                      />
                      <Label htmlFor="presencial" className="text-[#a3a3a3] cursor-pointer">
                        {t("contact.form.presencial")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="online"
                        checked={formData.online}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, online: checked as boolean })
                          if (errors.goal) setErrors({ ...errors, goal: undefined })
                        }}
                        className="border-[#262626] data-[state=checked]:bg-[#dc2626] data-[state=checked]:border-[#dc2626] w-5 h-5"
                      />
                      <Label htmlFor="online" className="text-[#a3a3a3] cursor-pointer">
                        {t("contact.form.online")}
                      </Label>
                    </div>
                  </div>
                  {errors.goal && (
                    <p className="text-[#dc2626] text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.goal}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-[#fafafa] font-[family-name:var(--font-oswald)] font-bold text-lg uppercase tracking-wider min-h-[56px] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    {t("contact.form.submit")}
                  </span>
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#262626]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#525252]">
            <p>{"© "}{new Date().getFullYear()}{" Warrior's Home. "}{t("footer.rights")}</p>
            <p>Mar del Plata, Argentina</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
