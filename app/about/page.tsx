'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCamera, FaMicrophone, FaPlane, FaLightbulb } from 'react-icons/fa';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/shared/ScrollReveal';

const timeline = [
    { year: '2020', title: 'Début de la vidéo', description: 'Premières réalisations et apprentissage autodidacte.' },
    { year: '2021', title: 'Premier mariage filmé', description: 'Mon premier film de mariage complet.' },
    { year: '2022', title: 'Lancement corporate', description: 'Début des collaborations avec les entreprises.' },
    { year: '2023', title: '100ème projet', description: 'Un cap symbolique franchi avec fierté.' },
    { year: '2025', title: 'Drone + Clip musical', description: 'Nouvelles compétences, nouvelles perspectives.' },
];

const equipment = [
    { icon: FaCamera, name: 'Sony A7III', type: 'Caméra' },
    { icon: FaMicrophone, name: 'Rode NTG5', type: 'Microphone' },
    { icon: FaPlane, name: 'DJI Mavic 3', type: 'Drone' },
    { icon: FaLightbulb, name: 'Aputure 600d', type: 'Éclairage' },
];

export default function AboutPage() {
    return (
        <PageTransition>
            <main className="pt-24 pb-20">
                {/* Hero section */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Photo */}
                        <ScrollReveal direction="left">
                            <div className="relative aspect-[3/4] max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden group">
                                <Image
                                    src="/bob.jpg"
                                    alt="José Randrianaivo"
                                    fill
                                    className="object-cover scale-x-[-1] transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                            </div>
                        </ScrollReveal>

                        {/* Text */}
                        <ScrollReveal direction="right">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                                    JOSÉ <span className="text-accent">RANDRIANAIVO</span>
                                </h1>
                                <p className="text-xl text-accent font-medium mb-6">Filmmaker & Vidéaste</p>
                                <p className="text-text-muted leading-relaxed">
                                    Passionné par l&apos;image et la narration visuelle depuis plus de 5 ans.
                                    Je capture des moments uniques avec une approche cinématique.
                                    Basé à Antananarivo, Madagascar, je travaille sur tout type de projets :
                                    mariages, vidéos corporate, clips musicaux et prises de vues aériennes par drone.
                                </p>
                                <p className="text-text-muted leading-relaxed mt-4">
                                    Mon objectif : transformer chaque projet en une œuvre visuelle
                                    qui raconte une histoire et suscite des émotions.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
                            MON <span className="text-accent">PARCOURS</span>
                        </h2>
                    </ScrollReveal>

                    {/* Desktop: horizontal timeline */}
                    <div className="hidden md:block relative">
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" />
                        <div className="grid grid-cols-5 gap-4">
                            {timeline.map((item, i) => (
                                <ScrollReveal key={item.year} delay={i * 0.15}>
                                    <div className="relative pt-12">
                                        {/* Dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.15, type: 'spring' }}
                                            className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-background z-10"
                                        />
                                        <div className="text-center">
                                            <span className="text-accent font-heading font-bold text-lg">{item.year}</span>
                                            <h3 className="font-heading font-semibold mt-2 text-sm">{item.title}</h3>
                                            <p className="text-text-muted text-xs mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Mobile: vertical timeline */}
                    <div className="md:hidden relative pl-8">
                        <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-white/10" />
                        <div className="space-y-8">
                            {timeline.map((item, i) => (
                                <ScrollReveal key={item.year} delay={i * 0.1}>
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            className="absolute -left-8 top-1 w-6 h-6 bg-accent rounded-full border-4 border-background z-10"
                                        />
                                        <span className="text-accent font-heading font-bold">{item.year}</span>
                                        <h3 className="font-heading font-semibold mt-1">{item.title}</h3>
                                        <p className="text-text-muted text-sm mt-1">{item.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Equipment */}
                <section className="py-20 bg-surface">
                    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
                                ÉQUIPE<span className="text-accent">MENT</span>
                            </h2>
                        </ScrollReveal>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {equipment.map((item, i) => (
                                <ScrollReveal key={item.name} delay={i * 0.1}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(61,139,122,0.2)' }}
                                        className="bg-background rounded-xl p-6 text-center border border-white/5 hover:border-accent/30 transition-colors"
                                    >
                                        <item.icon className="text-accent text-3xl mx-auto mb-3" />
                                        <h3 className="font-heading font-semibold text-sm">{item.name}</h3>
                                        <p className="text-text-muted text-xs mt-1">{item.type}</p>
                                    </motion.div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </PageTransition>
    );
}
