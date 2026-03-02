'use client';

import { motion } from 'framer-motion';
import { categories } from '@/data/videos';

interface CategoryFilterProps {
    selected: string;
    onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => onChange(cat.value)}
                    className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${selected === cat.value
                            ? 'text-background'
                            : 'text-text-muted hover:text-text-primary'
                        }`}
                >
                    {selected === cat.value && (
                        <motion.div
                            layoutId="activeCategory"
                            className="absolute inset-0 bg-accent rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                </button>
            ))}
        </div>
    );
}

