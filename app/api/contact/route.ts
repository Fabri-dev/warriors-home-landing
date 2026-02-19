import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, experience, presencial, online } = body

    // Server-side validation
    if (!name || !phone || !experience || (!presencial && !online)) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios." },
        { status: 400 }
      )
    }

    const modality = [presencial && "Presencial", online && "Online"]
      .filter(Boolean)
      .join(" + ")

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Warrior's Home" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `🥊 Nuevo contacto: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fafafa; padding: 32px; border-radius: 8px;">
          <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #dc2626; padding-bottom: 12px;">
            Nuevo Contacto — Warrior's Home
          </h1>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #a3a3a3; width: 140px;">Nombre</td>
              <td style="padding: 10px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a3a3a3;">Teléfono</td>
              <td style="padding: 10px 0; font-weight: bold;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a3a3a3;">Experiencia</td>
              <td style="padding: 10px 0; font-weight: bold; text-transform: capitalize;">${experience}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a3a3a3;">Modalidad</td>
              <td style="padding: 10px 0; font-weight: bold;">${modality}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; color: #525252; font-size: 12px;">
            Enviado desde warriorshome.com.ar
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intentá de nuevo." },
      { status: 500 }
    )
  }
}
