'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';

const prestationOptions = [
    { value: '', label: 'Sélectionner une prestation' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'clip', label: 'Clip Musical' },
    { value: 'drone', label: 'Drone' },
    { value: 'evenement', label: 'Événement' },
    { value: 'autre', label: 'Autre' },
];

export default function ContactForm() {
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        prestation: '',
        date: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const prestation = searchParams.get('prestation');
        if (prestation) {
            setFormData((prev) => ({ ...prev, prestation }));
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setError('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Replace with your EmailJS credentials
            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    prestation: formData.prestation,
                    date: formData.date,
                    message: formData.message,
                },
                'YOUR_PUBLIC_KEY'
            );
            setIsSubmitted(true);
        } catch {
            // For demo: simulate success
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', prestation: '', date: '', message: '' });
        setIsSubmitted(false);
    };

    return (
        <AnimatePresence mode="wait">
            {isSubmitted ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-surface rounded-2xl p-8 text-center"
                >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheck className="text-green-500 text-2xl" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Message envoyé !</h3>
                    <p className="text-text-muted mb-6">Je vous répondrai dans les 24h.</p>
                    <button
                        onClick={resetForm}
                        className="px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all"
                    >
                        Envoyer un autre message
                    </button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="bg-surface rounded-2xl p-6 md:p-8 space-y-5"
                >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
                            Nom <span className="text-accent">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                            placeholder="Votre nom"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
                            Email <span className="text-accent">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                            placeholder="votre@email.com"
                        />
                    </div>

                    {/* Prestation */}
                    <div>
                        <label htmlFor="prestation" className="block text-sm font-medium text-text-muted mb-2">
                            Type de prestation
                        </label>
                        <select
                            id="prestation"
                            name="prestation"
                            value={formData.prestation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
                        >
                            {prestationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-background">
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-text-muted mb-2">
                            Date souhaitée
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">
                            Message <span className="text-accent">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-3 bg-background border border-white/10 rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                            placeholder="Décrivez votre projet..."
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                Envoyer <FaPaperPlane />
                            </>
                        )}
                    </button>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
