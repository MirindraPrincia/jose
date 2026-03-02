'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import type { IconType } from 'react-icons';

const socialIconMap: Record<string, IconType> = {
    whatsapp: FaWhatsapp,
    facebook: FaFacebookF,
    instagram: FaInstagram,
    email: FaEnvelope,
    phone: FaPhone,
};

const socialHoverColor: Record<string, string> = {
    whatsapp: 'hover:text-green-500',
    facebook: 'hover:text-blue-500',
    instagram: 'hover:text-pink-500',
    email: 'hover:text-accent',
    phone: 'hover:text-accent',
};

interface SocialItem {
    id: string;
    label: string;
    href: string;
}

function handleEncodedClick(e: React.MouseEvent, encodedHref: string) {
    e.preventDefault();
    const url = atob(encodedHref);
    if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        window.location.href = url;
    }
}

export default function Footer() {
    const [socialLinks, setSocialLinks] = useState<SocialItem[]>([]);

    useEffect(() => {
        fetch('/api/contact')
            .then((res) => res.json())
            .then((data) => {
                setSocialLinks(data.socials);
            });
    }, []);

    return (
        <footer className="bg-surface border-t border-white/5">
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-6 md:py-8">
                {/* Logo centré */}
                <div className="text-center">
                    <Link href="/" className="text-3xl font-heading font-bold text-accent">
                        BOB
                    </Link>
                    <p className="mt-2 text-text-muted text-sm">
                        Filmmaker & Vidéaste
                    </p>
                </div>

                {/* Séparateur + bas de footer */}
                <div className="mt-4 pt-4 border-t border-white/5">
                    {/* Desktop : copyright gauche / icônes droite */}
                    <div className="hidden md:flex md:items-center md:justify-between">
                        <p className="text-text-muted text-xs">
                            &copy; {new Date().getFullYear()} José Randrianaivo. Tous droits réservés.
                        </p>
                        <div className="flex items-center gap-5">
                            {socialLinks.map((social) => {
                                const Icon = socialIconMap[social.id] || FaEnvelope;
                                const hoverColor = socialHoverColor[social.id] || 'hover:text-accent';
                                return (
                                    <button
                                        key={social.label}
                                        onClick={(e) => handleEncodedClick(e, social.href)}
                                        className={`text-text-muted ${hoverColor} transition-all hover:scale-110 cursor-pointer`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile : icônes centrées puis copyright */}
                    <div className="md:hidden text-center">
                        <div className="flex justify-center gap-5">
                            {socialLinks.map((social) => {
                                const Icon = socialIconMap[social.id] || FaEnvelope;
                                const hoverColor = socialHoverColor[social.id] || 'hover:text-accent';
                                return (
                                    <button
                                        key={social.label}
                                        onClick={(e) => handleEncodedClick(e, social.href)}
                                        className={`text-text-muted ${hoverColor} transition-all hover:scale-110 p-1 cursor-pointer`}
                                        aria-label={social.label}
                                    >
                                        <Icon size={20} />
                                    </button>
                                );
                            })}
                        </div>
                        <p className="mt-4 text-text-muted text-xs">
                            &copy; {new Date().getFullYear()} José Randrianaivo. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

