'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { videos } from '@/data/videos';

const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'À propos' },
    { href: '/prestations', label: 'Prestations' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<typeof videos>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileOpen(false);
        setIsSearchOpen(false);
        setSearchQuery('');
    }, [pathname]);

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileOpen]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter videos on search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        const q = searchQuery.toLowerCase();
        const results = videos.filter(
            (v) =>
                v.title.toLowerCase().includes(q) ||
                v.category.toLowerCase().includes(q) ||
                v.description.toLowerCase().includes(q)
        ).slice(0, 5);
        setSearchResults(results);
    }, [searchQuery]);

    const handleResultClick = (slug: string) => {
        router.push(`/portfolio/${slug}`);
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileOpen
                        ? 'bg-background/95 backdrop-blur-md shadow-lg'
                        : 'bg-transparent'
                    }`}
            >
                <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo - extrême gauche */}
                        <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-accent hover:text-accent/80 transition-colors flex-shrink-0">
                            BOB
                        </Link>

                        {/* Desktop Navigation + Search - extrême droite */}
                        <div className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative text-sm font-medium transition-colors hover:text-accent group whitespace-nowrap ${pathname === link.href ? 'text-accent' : 'text-text-primary'
                                        }`}
                                >
                                    {link.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </Link>
                            ))}

                            {/* Search button / bar */}
                            <div ref={searchContainerRef} className="relative">
                                <AnimatePresence mode="wait">
                                    {isSearchOpen ? (
                                        <motion.div
                                            key="search-input"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 250, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative"
                                        >
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Rechercher..."
                                                className="w-full pl-4 pr-9 py-2 bg-surface border border-white/10 rounded-full text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                                            />
                                            <button
                                                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent transition-colors"
                                            >
                                                <FaTimes size={12} />
                                            </button>

                                            {/* Search results dropdown */}
                                            {searchResults.length > 0 && (
                                                <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                                                    {searchResults.map((video) => (
                                                        <button
                                                            key={video.slug}
                                                            onClick={() => handleResultClick(video.slug)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                                                        >
                                                            <div
                                                                className="w-12 h-8 rounded bg-cover bg-center flex-shrink-0"
                                                                style={{ backgroundImage: `url(${video.thumbnail})` }}
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="text-sm text-text-primary truncate">{video.title}</p>
                                                                <p className="text-xs text-accent capitalize">{video.category}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {searchQuery.trim() !== '' && searchResults.length === 0 && (
                                                <div className="absolute top-full right-0 mt-2 w-80 bg-surface border border-white/10 rounded-xl shadow-2xl p-4 z-50">
                                                    <p className="text-sm text-text-muted text-center">Aucun résultat pour &ldquo;{searchQuery}&rdquo;</p>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="search-btn"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setIsSearchOpen(true)}
                                            className="text-text-primary hover:text-accent transition-colors p-2"
                                            aria-label="Rechercher"
                                        >
                                            <FaSearch size={16} />
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile: search + burger */}
                        <div className="flex items-center gap-3 md:hidden">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="text-text-primary hover:text-accent transition-colors p-1"
                                aria-label="Rechercher"
                            >
                                <FaSearch size={18} />
                            </button>
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="text-text-primary hover:text-accent transition-colors z-50"
                                aria-label="Menu"
                            >
                                {isMobileOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile search bar */}
                    <AnimatePresence>
                        {isSearchOpen && !isMobileOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden overflow-hidden pb-3"
                                ref={searchContainerRef}
                            >
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Rechercher une vidéo..."
                                        className="w-full pl-9 pr-4 py-2.5 bg-surface border border-white/10 rounded-full text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50"
                                    />
                                </div>

                                {/* Mobile search results */}
                                {searchResults.length > 0 && (
                                    <div className="mt-2 bg-surface border border-white/10 rounded-xl overflow-hidden">
                                        {searchResults.map((video) => (
                                            <button
                                                key={video.slug}
                                                onClick={() => handleResultClick(video.slug)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                                            >
                                                <div
                                                    className="w-12 h-8 rounded bg-cover bg-center flex-shrink-0"
                                                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm text-text-primary truncate">{video.title}</p>
                                                    <p className="text-xs text-accent capitalize">{video.category}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {searchQuery.trim() !== '' && searchResults.length === 0 && (
                                    <div className="mt-2 bg-surface border border-white/10 rounded-xl p-4">
                                        <p className="text-sm text-text-muted text-center">Aucun résultat</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </nav>

            {/* Mobile Menu - dropdown from top */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-black/60 md:hidden"
                            style={{ zIndex: 9998 }}
                        />
                        {/* Menu panel */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 left-0 right-0 bg-[#0a0a0a] md:hidden border-b border-white/10 rounded-b-2xl"
                            style={{ zIndex: 9999 }}
                        >
                            {/* Close button */}
                            <div className="flex justify-end px-5 pt-4">
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-text-primary hover:text-accent transition-colors"
                                    aria-label="Fermer"
                                >
                                    <HiX size={28} />
                                </button>
                            </div>
                            <div className="flex flex-col items-center gap-6 pb-8 pt-4">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`text-xl font-heading font-semibold transition-colors hover:text-accent ${pathname === link.href ? 'text-accent' : 'text-text-primary'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
