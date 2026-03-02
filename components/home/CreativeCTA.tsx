'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function CreativeCTA() {
    const marqueeText = 'CRÉONS ENSEMBLE \u00B7 LET\'S CREATE \u00B7 ';

    return (
        <section className="py-24 overflow-hidden relative">
            {/* Ligne décorative animée */}
            <ScrollReveal>
                <div className="w-24 h-[2px] bg-accent mx-auto mb-16" />
            </ScrollReveal>

            {/* Texte décoratif statique */}
            <div className="relative mb-16">
                <div className="flex justify-center whitespace-nowrap overflow-hidden">
                    <span
                        className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-transparent"
                        style={{ WebkitTextStroke: '2px rgba(61,139,122,0.25)' }}
                    >
                        CRÉONS ENSEMBLE
                    </span>
                </div>

                {/* Texte central fixe par-dessus */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <ScrollReveal>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center px-4">
                            Votre <span className="text-accent">vision</span>,
                            <br />
                            mon <span className="text-accent">expertise</span>
                        </h2>
                    </ScrollReveal>
                </div>
            </div>

            {/* Description + bouton */}
            <ScrollReveal delay={0.2}>
                <div className="text-center px-4">
                    <p className="text-text-muted max-w-lg mx-auto mb-8 text-sm md:text-base">
                        Chaque projet est unique. Discutons de votre idée et donnons-lui vie
                        à travers une production vidéo sur mesure.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(61,139,122,0.3)] group"
                    >
                        Démarrer un projet
                        <motion.span
                            className="inline-block"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            &rarr;
                        </motion.span>
                    </Link>
                </div>
            </ScrollReveal>
        </section>
    );
}

