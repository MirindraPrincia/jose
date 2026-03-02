'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart, FaBuilding, FaMusic, FaPlane } from 'react-icons/fa';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/shared/ScrollReveal';

const prestations = [
    {
        icon: FaHeart,
        title: 'Mariage',
        description: 'Film complet de votre journée',
        features: [
            'Préparatifs → Réception',
            'Teaser 2min + Film 15-30min',
            'Drone inclus',
        ],
        prestation: 'mariage',
    },
    {
        icon: FaBuilding,
        title: 'Corporate',
        description: "Vidéos d'entreprise",
        features: [
            'Présentation entreprise',
            'Événement / Conférence',
            'Interview / Témoignage',
        ],
        prestation: 'corporate',
    },
    {
        icon: FaMusic,
        title: 'Clip Musical',
        description: 'Réalisation de clips',
        features: [
            'Concept & Storyboard',
            'Tournage multi-caméra',
            'Montage & Color grading',
        ],
        prestation: 'clip',
    },
    {
        icon: FaPlane,
        title: 'Drone',
        description: 'Prises de vues aériennes',
        features: [
            'Immobilier',
            'Événements',
            'Paysages & Construction',
        ],
        prestation: 'drone',
    },
];

export default function PrestationsPage() {
    return (
        <PageTransition>
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        MES <span className="text-accent">PRESTATIONS</span>
                    </h1>
                    <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
                        Des services sur mesure pour donner vie à vos projets audiovisuels.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {prestations.map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 0.1}>
                            <motion.div
                                whileHover={{
                                    y: -4,
                                    boxShadow: '0 0 30px rgba(61,139,122,0.15)',
                                }}
                                className="bg-surface rounded-2xl p-8 border border-white/5 hover:border-accent/30 transition-colors h-full flex flex-col"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', delay: i * 0.1 }}
                                >
                                    <item.icon className="text-accent text-3xl mb-4" />
                                </motion.div>

                                <h2 className="text-2xl font-heading font-bold mb-2">{item.title}</h2>
                                <p className="text-text-muted mb-6">{item.description}</p>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    {item.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-text-muted">
                                            <span className="text-accent mt-1.5 text-xs">&#9679;</span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={`/contact?prestation=${item.prestation}`}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(61,139,122,0.3)] group w-full"
                                >
                                    Me contacter
                                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </main>
        </PageTransition>
    );
}

