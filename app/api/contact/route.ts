import { NextResponse } from 'next/server';

function encode(str: string): string {
    return Buffer.from(str).toString('base64');
}

const contactInfo = [
    { type: 'location', label: encode('Antananarivo, Madagascar') },
    { type: 'phone', label: encode('+261 32 07 030 50'), href: encode('tel:+261320703050') },
    { type: 'email', label: encode('bobjose95@gmail.com'), href: encode('mailto:bobjose95@gmail.com') },
];

const socials = [
    { id: 'whatsapp', label: 'WhatsApp', href: encode('https://wa.me/261320703050') },
    { id: 'facebook', label: 'Facebook', href: encode('https://m.facebook.com/jose.randrianaivo/') },
    { id: 'instagram', label: 'Instagram', href: encode('https://www.instagram.com/joserandrianaivo/') },
    { id: 'email', label: 'Email', href: encode('mailto:bobjose95@gmail.com') },
    { id: 'phone', label: 'Téléphone', href: encode('tel:+261320703050') },
];

export async function GET() {
    return NextResponse.json({ contactInfo, socials });
}
