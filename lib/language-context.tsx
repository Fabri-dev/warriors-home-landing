"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "es" | "en"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    "nav.coach": "Coach",
    "nav.programs": "Programas",
    "nav.schedule": "Horarios",
    "nav.faq": "FAQ",
    "nav.contact": "Contacto",
    "nav.cta": "Empezá hoy",

    // Hero
    "hero.headline1": "No es motivación.",
    "hero.headline2": "Es necesidad.",
    "hero.sub1": "Cuando no hay fuerza, igual te movés. Cuando no hay ganas, igual salís a pelear.",
    "hero.sub2": " Bienvenido a Warrior's Home.",
    "hero.cta": "Empezá tu transformación",

    // Coach
    "coach.label": "Head Coach",
    "coach.badge1": "Southfit Challenge Elite Individual - 2do Puesto",
    "coach.badge2": "CrossFit Coach & Athlete",
    "coach.quote": "Detrás de cada avance hay constancia. Mi trabajo es ajustar detalles y corregir movimientos para que saques el mayor jugo a tu entrenamiento.",
    "coach.stat1.value": "8+",
    "coach.stat1.label": "Años exp.",
    "coach.stat2.value": "500+",
    "coach.stat2.label": "Atletas",
    "coach.stat3.value": "Top 2",
    "coach.stat3.label": "Southfit",

    // Philosophy
    "philosophy.label": "Nuestra Filosofía",
    "philosophy.headline1": "La técnica ",
    "philosophy.headline2": "no se negocia.",
    "philosophy.text": "No se trata solo de moverse, sino de construir bases sólidas desde el primer día.",

    // Programs
    "programs.label": "Programas",
    "programs.headline1": "Elegí tu ",
    "programs.headline2": "camino",
    "programs.crossfit.title": "CrossFit General",
    "programs.crossfit.subtitle": "Comunidad y Fuerza",
    "programs.crossfit.desc": "Para todos los niveles. Entrenamiento funcional en grupo con el soporte de la comunidad.",
    "programs.women.title": "Warrior Women",
    "programs.women.subtitle": "Rendimiento y Estética",
    "programs.women.desc": "Fase metabólica + Bloque de hipertrofia enfocado en tren inferior. Salud y composición corporal real.",
    "programs.women.badge": "Popular",
    "programs.beginners.title": "Principiantes",
    "programs.beginners.subtitle": "Aprendé a moverte",
    "programs.beginners.desc": "Priorizamos la técnica y la base antes de la intensidad. Te convertimos en atleta paso a paso.",
    "programs.online.title": "Coaching Online",
    "programs.online.subtitle": "100% Personalizado",
    "programs.online.desc": "Planificación por documento, feedback de técnica mediante video y contacto directo por WhatsApp/Mail. No sos un número en una app.",

    // Schedule
    "schedule.label": "Horarios",
    "schedule.headline1": "Lunes a ",
    "schedule.headline2": "Viernes",
    "schedule.noon": "Mediodía",
    "schedule.siesta": "Siesta",
    "schedule.afternoon": "Tarde",
    "schedule.primetime": "Prime Time",
    "schedule.night": "Noche",
    "schedule.location": "Mar del Plata",
    "schedule.country": "Argentina",

    // FAQ
    "faq.label": "Preguntas Frecuentes",
    "faq.headline1": "Todo lo que ",
    "faq.headline2": "necesitás saber",
    "faq.q1": "¿Necesito experiencia previa para empezar?",
    "faq.a1": "No. Tenemos un programa especial para principiantes donde te enseñamos todos los movimientos desde cero. Priorizamos la técnica antes de la intensidad para que progreses de forma segura.",
    "faq.q2": "¿Qué es Warrior Women y en qué se diferencia del CrossFit general?",
    "faq.a2": "Warrior Women es un programa diseñado específicamente para mujeres que buscan rendimiento y estética. Combina fases metabólicas con bloques de hipertrofia enfocados en tren inferior, mejorando la composición corporal de forma real y sostenible.",
    "faq.q3": "¿Cómo funciona el Coaching Online?",
    "faq.a3": "Recibís una planificación personalizada por documento, enviás videos de tus entrenamientos para recibir correcciones de técnica, y tenés contacto directo por WhatsApp o Mail. No sos un número en una app, es un seguimiento real.",
    "faq.q4": "¿Cuántas veces por semana debería entrenar?",
    "faq.a4": "Depende de tu nivel y objetivos. Para principiantes recomendamos 3-4 veces por semana. Para intermedios y avanzados, entre 4-5 sesiones. El coach te guía según tu progreso y recuperación.",
    "faq.q5": "¿Puedo hacer una clase de prueba?",
    "faq.a5": "¡Por supuesto! Contactanos por WhatsApp o completá el formulario de contacto y coordinamos tu primera clase. Queremos que conozcas el ambiente y la metodología antes de comprometerte.",
    "faq.q6": "¿Qué horarios tienen disponibles?",
    "faq.a6": "Entrenamos de Lunes a Viernes en los siguientes horarios: 13h, 14h, 18h, 19h y 20h. Podés elegir el que mejor se adapte a tu rutina.",

    // Contact
    "contact.label": "Contacto",
    "contact.headline1": "¿Listo para dar",
    "contact.headline2": "el paso?",
    "contact.quote": "Si no lo hacés vos, nadie lo va a hacer por vos.",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre",
    "contact.form.phone": "WhatsApp",
    "contact.form.phone.placeholder": "+54 223 123 4567",
    "contact.form.experience": "Nivel de experiencia",
    "contact.form.experience.placeholder": "Seleccioná tu nivel",
    "contact.form.exp.beginner": "Principiante (0-6 meses)",
    "contact.form.exp.intermediate": "Intermedio (6 meses - 2 años)",
    "contact.form.exp.advanced": "Avanzado (2+ años)",
    "contact.form.mode": "Modalidad de entrenamiento",
    "contact.form.presencial": "Presencial",
    "contact.form.online": "Online",
    "contact.form.submit": "Enviar mensaje",
    "contact.form.submitting": "Enviando...",
    "contact.form.success.title": "¡Mensaje enviado!",
    "contact.form.success.text": "Te contactaremos pronto por WhatsApp.",
    "contact.form.error.name": "Ingresá tu nombre",
    "contact.form.error.phone": "Ingresá tu WhatsApp",
    "contact.form.error.phone.invalid": "Número inválido",
    "contact.form.error.experience": "Seleccioná tu nivel",
    "contact.form.error.goal": "Elegí al menos una modalidad",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
  },
  en: {
    // Navbar
    "nav.coach": "Coach",
    "nav.programs": "Programs",
    "nav.schedule": "Schedule",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.cta": "Start today",

    // Hero
    "hero.headline1": "It's not motivation.",
    "hero.headline2": "It's necessity.",
    "hero.sub1": "When there's no strength, you still move. When there's no will, you still fight.",
    "hero.sub2": " Welcome to Warrior's Home.",
    "hero.cta": "Start your transformation",

    // Coach
    "coach.label": "Head Coach",
    "coach.badge1": "Southfit Challenge Elite Individual - 2nd Place",
    "coach.badge2": "CrossFit Coach & Athlete",
    "coach.quote": "Behind every breakthrough there's consistency. My job is to fine-tune details and correct movement so you get the most out of your training.",
    "coach.stat1.value": "8+",
    "coach.stat1.label": "Years exp.",
    "coach.stat2.value": "500+",
    "coach.stat2.label": "Athletes",
    "coach.stat3.value": "Top 2",
    "coach.stat3.label": "Southfit",

    // Philosophy
    "philosophy.label": "Our Philosophy",
    "philosophy.headline1": "Technique is ",
    "philosophy.headline2": "non-negotiable.",
    "philosophy.text": "It's not just about moving, but about building solid foundations from day one.",

    // Programs
    "programs.label": "Programs",
    "programs.headline1": "Choose your ",
    "programs.headline2": "path",
    "programs.crossfit.title": "General CrossFit",
    "programs.crossfit.subtitle": "Community & Strength",
    "programs.crossfit.desc": "For all levels. Group functional training with community support.",
    "programs.women.title": "Warrior Women",
    "programs.women.subtitle": "Performance & Aesthetics",
    "programs.women.desc": "Metabolic phase + Hypertrophy block focused on lower body. Real health and body composition.",
    "programs.women.badge": "Popular",
    "programs.beginners.title": "Beginners",
    "programs.beginners.subtitle": "Learn to move",
    "programs.beginners.desc": "We prioritize technique and foundation before intensity. We turn you into an athlete step by step.",
    "programs.online.title": "Online Coaching",
    "programs.online.subtitle": "100% Personalized",
    "programs.online.desc": "Document-based programming, video technique feedback and direct contact via WhatsApp/Email. You're not a number in an app.",

    // Schedule
    "schedule.label": "Schedule",
    "schedule.headline1": "Monday to ",
    "schedule.headline2": "Friday",
    "schedule.noon": "Noon",
    "schedule.siesta": "Early afternoon",
    "schedule.afternoon": "Afternoon",
    "schedule.primetime": "Prime Time",
    "schedule.night": "Night",
    "schedule.location": "Mar del Plata",
    "schedule.country": "Argentina",

    // FAQ
    "faq.label": "Frequently Asked Questions",
    "faq.headline1": "Everything you ",
    "faq.headline2": "need to know",
    "faq.q1": "Do I need prior experience to start?",
    "faq.a1": "No. We have a special program for beginners where we teach you all movements from scratch. We prioritize technique before intensity so you progress safely.",
    "faq.q2": "What is Warrior Women and how is it different from general CrossFit?",
    "faq.a2": "Warrior Women is a program specifically designed for women seeking performance and aesthetics. It combines metabolic phases with hypertrophy blocks focused on lower body, improving body composition in a real and sustainable way.",
    "faq.q3": "How does Online Coaching work?",
    "faq.a3": "You receive personalized programming by document, send videos of your workouts for technique corrections, and have direct contact via WhatsApp or Email. You're not a number in an app, it's real follow-up.",
    "faq.q4": "How many times per week should I train?",
    "faq.a4": "It depends on your level and goals. For beginners we recommend 3-4 times per week. For intermediate and advanced, 4-5 sessions. The coach guides you based on your progress and recovery.",
    "faq.q5": "Can I take a trial class?",
    "faq.a5": "Absolutely! Contact us via WhatsApp or fill out the contact form and we'll coordinate your first class. We want you to experience the atmosphere and methodology before committing.",
    "faq.q6": "What schedule do you have available?",
    "faq.a6": "We train Monday through Friday at the following times: 1pm, 2pm, 6pm, 7pm and 8pm. You can choose the one that best fits your routine.",

    // Contact
    "contact.label": "Contact",
    "contact.headline1": "Ready to take",
    "contact.headline2": "the step?",
    "contact.quote": "If you don't do it yourself, nobody will do it for you.",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your name",
    "contact.form.phone": "WhatsApp",
    "contact.form.phone.placeholder": "+54 223 123 4567",
    "contact.form.experience": "Experience level",
    "contact.form.experience.placeholder": "Select your level",
    "contact.form.exp.beginner": "Beginner (0-6 months)",
    "contact.form.exp.intermediate": "Intermediate (6 months - 2 years)",
    "contact.form.exp.advanced": "Advanced (2+ years)",
    "contact.form.mode": "Training mode",
    "contact.form.presencial": "In-person",
    "contact.form.online": "Online",
    "contact.form.submit": "Send message",
    "contact.form.submitting": "Sending...",
    "contact.form.success.title": "Message sent!",
    "contact.form.success.text": "We'll contact you soon via WhatsApp.",
    "contact.form.error.name": "Enter your name",
    "contact.form.error.phone": "Enter your WhatsApp",
    "contact.form.error.phone.invalid": "Invalid number",
    "contact.form.error.experience": "Select your level",
    "contact.form.error.goal": "Choose at least one mode",

    // Footer
    "footer.rights": "All rights reserved.",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
