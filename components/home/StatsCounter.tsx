'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFilm, FaHeart, FaClock } from 'react-icons/fa';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface StatProps {
    icon: React.ReactNode;
    target: number;
    suffix: string;
    label: string;
    delay: number;
}

function AnimatedCounter({ icon, target, suffix, label, delay }: StatProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const timer = setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;

            const interval = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setCount(target);
                    clearInterval(interval);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(interval);
        }, delay * 1000);

        return () => clearTimeout(timer);
    }, [isInView, target, delay]);

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
        >
            <div className="text-accent text-3xl mb-3 flex justify-center">{icon}</div>
            <div className="text-4xl md:text-5xl font-heading font-bold text-text-primary">
                {count}{suffix}
            </div>
            <p className="text-text-muted mt-2 text-sm">{label}</p>
        </motion.div>
    );
}

const stats = [
    { icon: <FaFilm />, target: 150, suffix: '+', label: 'Projets réalisés' },
    { icon: <FaHeart />, target: 80, suffix: '+', label: 'Mariages filmés' },
    { icon: <FaClock />, target: 5, suffix: '+', label: "Années d'expérience" },
];

export default function StatsCounter() {
    return (
        <section className="py-20 bg-surface">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16">
                        CHIFFRES <span className="text-accent">CLÉS</span>
                    </h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {stats.map((stat, index) => (
                        <AnimatedCounter key={stat.label} {...stat} delay={index * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
}

