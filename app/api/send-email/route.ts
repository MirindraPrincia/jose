import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, prestation, date, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nom, email et message sont obligatoires.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // Connexion Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email envoyé à toi
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nouveau message - ${prestation || 'Contact'} | ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3d8b7a; border-bottom: 2px solid #3d8b7a; padding-bottom: 10px;">
            Nouveau message depuis le site
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Nom</td>
              <td style="padding: 8px 0; color: #555;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Email</td>
              <td style="padding: 8px 0; color: #555;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Prestation</td>
              <td style="padding: 8px 0; color: #555;">${prestation || 'Non spécifiée'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Date souhaitée</td>
              <td style="padding: 8px 0; color: #555;">${date || 'Non spécifiée'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p style="font-weight: bold; color: #333; margin-bottom: 8px;">Message :</p>
            <p style="color: #555; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            Répondre directement à cet email pour contacter ${name} (${email})
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi email:', error);

    let message = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('auth')) {
        message = 'Le service d\'envoi d\'email est temporairement indisponible. Veuillez nous contacter directement par téléphone.';
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        message = 'Impossible de se connecter au serveur email. Vérifiez votre connexion internet.';
      }
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
