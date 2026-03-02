'use client';

import { Suspense } from 'react';
import PageTransition from '@/components/layout/PageTransition';
import ContactForm from '@/components/contact/ContactForm';
import SocialLinks from '@/components/contact/SocialLinks';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ContactPage() {
    return (
        <PageTransition>
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        CONTACTEZ<span className="text-accent">-MOI</span>
                    </h1>
                    <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
                        Un projet en tête ? N&apos;hésitez pas à me contacter pour en discuter.
                    </p>
                </ScrollReveal>

                {/* Mobile: social links first */}
                <div className="md:hidden mb-8">
                    <ScrollReveal>
                        <SocialLinks />
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
                    {/* Form */}
                    <div className="md:col-span-3">
                        <ScrollReveal>
                            <Suspense>
                                <ContactForm />
                            </Suspense>
                        </ScrollReveal>
                    </div>

                    {/* Desktop: social links */}
                    <div className="hidden md:block md:col-span-2">
                        <ScrollReveal direction="right" delay={0.2}>
                            <SocialLinks />
                        </ScrollReveal>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}

