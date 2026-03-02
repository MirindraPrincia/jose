'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

const iconMap: Record<string, IconType> = {
    location: FaMapMarkerAlt,
    phone: FaPhone,
    email: FaEnvelope,
};

const socialIconMap: Record<string, IconType> = {
    whatsapp: FaWhatsapp,
    facebook: FaFacebookF,
    instagram: FaInstagram,
    email: FaEnvelope,
};

const socialHoverBg: Record<string, string> = {
    whatsapp: 'hover:bg-green-500',
    facebook: 'hover:bg-blue-600',
    instagram: 'hover:bg-pink-500',
    email: 'hover:bg-accent',
};

function decode(str: string): string {
    return atob(str);
}

interface ContactItem {
    type: string;
    label: string;
    href?: string;
}

interface SocialItem {
    id: string;
    label: string;
    href: string;
}

function handleEncodedClick(e: React.MouseEvent, encodedHref: string, external?: boolean) {
    e.preventDefault();
    const url = decode(encodedHref);
    if (external) {
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        window.location.href = url;
    }
}

export default function SocialLinks() {
    const [contactInfo, setContactInfo] = useState<ContactItem[]>([]);
    const [socials, setSocials] = useState<SocialItem[]>([]);

    useEffect(() => {
        fetch('/api/contact')
            .then((res) => res.json())
            .then((data) => {
                setContactInfo(data.contactInfo);
                setSocials(data.socials.filter((s: SocialItem) => s.id !== 'phone'));
            });
    }, []);

    return (
        <div className="space-y-8">
            {/* Contact info */}
            <div className="space-y-4">
                {contactInfo.map((item) => {
                    const Icon = iconMap[item.type] || FaEnvelope;
                    return (
                        <div key={item.type} className="flex items-center gap-3 text-text-muted">
                            <Icon className="text-accent flex-shrink-0" size={18} />
                            {item.href ? (
                                <button
                                    onClick={(e) => handleEncodedClick(e, item.href!, false)}
                                    className="hover:text-accent transition-colors text-sm text-left cursor-pointer"
                                >
                                    {decode(item.label)}
                                </button>
                            ) : (
                                <span className="text-sm">{decode(item.label)}</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
                {socials.map((social, i) => {
                    const Icon = socialIconMap[social.id] || FaEnvelope;
                    const hoverBg = socialHoverBg[social.id] || 'hover:bg-accent';
                    return (
                        <motion.button
                            key={social.label}
                            onClick={(e) => handleEncodedClick(e, social.href, true)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex items-center gap-2 px-4 py-3 bg-surface border border-white/5 rounded-lg text-text-muted ${hoverBg} hover:text-white hover:border-transparent transition-all hover:scale-105 cursor-pointer`}
                        >
                            <Icon size={18} />
                            <span className="text-sm font-medium">{social.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

