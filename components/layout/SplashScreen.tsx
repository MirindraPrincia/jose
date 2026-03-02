'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
    const [phase, setPhase] = useState<'loading' | 'done'>('loading');

    useEffect(() => {
        const seen = sessionStorage.getItem('splash-seen');
        if (seen) {
            setPhase('done');
            return;
        }

        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setPhase('done');
            sessionStorage.setItem('splash-seen', '1');
            document.body.style.overflow = '';
        }, 3500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    const handleExitComplete = useCallback(() => {
        document.body.style.overflow = '';
    }, []);

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {phase === 'loading' && (
                <motion.div
                    key="splash"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        zIndex: 99999,
                    }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Lettres BOB */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                        {['B', 'O', 'B'].map((letter, i) => (
                            <motion.span
                                key={i}
                                style={{
                                    fontSize: 'clamp(72px, 12vw, 144px)',
                                    fontFamily: 'Sora, sans-serif',
                                    fontWeight: 700,
                                    color: '#3d8b7a',
                                    lineHeight: 1,
                                }}
                                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 0.3 + i * 0.25,
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Ligne verte animée */}
                    <motion.div
                        style={{
                            height: '2px',
                            backgroundColor: '#3d8b7a',
                            marginTop: '24px',
                            borderRadius: '9999px',
                        }}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 120, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6, ease: 'easeInOut' }}
                    />

                    {/* Sous-titre */}
                    <motion.p
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: '#888888',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            marginTop: '20px',
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.5 }}
                    >
                        Filmmaker & Vidéaste
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

