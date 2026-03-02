
'use client';

import ScrollReveal from '@/components/shared/ScrollReveal';

const clients = [
    { name: 'Orange Actu', logo: '/logos/orange.jpg' },
    { name: 'UNICEF', logo: '/logos/unicef.jpg' },
    { name: 'Imagoo', logo: '/logos/ymagoo.jpg' },
];

export default function CTASection() {
    const scrollItems = [...clients, ...clients, ...clients, ...clients];

    return (
        <section className="py-20">
            <ScrollReveal>
                <p className="text-center text-text-muted text-sm uppercase tracking-widest mb-10">
                    Ils m&apos;ont fait <span className="text-accent">confiance</span>
                </p>
            </ScrollReveal>

            <div className="w-1/2 lg:w-[30%] mx-auto overflow-hidden relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Infinite scroll track */}
                <div className="flex animate-scroll-x w-max">
                    {scrollItems.map((client, i) => (
                        <div
                            key={`${client.name}-${i}`}
                            className="flex-shrink-0 flex flex-col items-center justify-center mx-8 md:mx-12 lg:mx-16 opacity-70 hover:opacity-100 transition-all duration-300">
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-cover"
                            />
                            <span className="text-text-muted text-[10px] md:text-xs mt-2 whitespace-nowrap">{client.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}