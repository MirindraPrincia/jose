'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { videos, type Video } from '@/data/videos';
import SearchBar from '@/components/portfolio/SearchBar';
import CategoryFilter from '@/components/portfolio/CategoryFilter';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/shared/ScrollReveal';

const VIDEOS_PER_PAGE = 6;

function CinematicCard({ video, index }: { video: Video; index: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    const isReversed = index % 2 !== 0;

    const handleMouseEnter = () => {
        setIsHovering(true);
        videoRef.current?.play();
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setVideoReady(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <Link href={`/portfolio/${video.slug}`}>
                <div
                    className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 rounded-xl overflow-hidden group cursor-pointer hover:ring-1 hover:ring-white/10 transition-all duration-300`}
                >
                    {/* Video / Image */}
                    <div
                        className="relative w-full md:w-3/5 aspect-video md:aspect-auto md:min-h-[300px] lg:min-h-[350px] overflow-hidden"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className={`object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                        <video
                            ref={videoRef}
                            src={video.videoUrl}
                            muted
                            loop
                            playsInline
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                            onPlaying={() => isHovering && setVideoReady(true)}
                        />
                        {/* Play icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-14 h-14 bg-accent/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-6 h-6 text-background ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-2/5 flex flex-col justify-center p-6 md:p-8 lg:p-10">
                        <span className="inline-block w-fit px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full uppercase tracking-wider">
                            {video.category}
                        </span>
                        <h3 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mt-3 group-hover:text-accent transition-colors">
                            {video.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-3 line-clamp-3 leading-relaxed">
                            {video.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs text-text-muted">{video.date}</span>
                            <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                                Voir
                                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function PortfolioPage() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(VIDEOS_PER_PAGE);

    const filteredVideos = useMemo(() => {
        return videos.filter((video) => {
            const matchesSearch =
                video.title.toLowerCase().includes(search.toLowerCase()) ||
                video.category.toLowerCase().includes(search.toLowerCase()) ||
                video.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === 'all' || video.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    const displayedVideos = filteredVideos.slice(0, visibleCount);
    const hasMore = visibleCount < filteredVideos.length;

    const handleCategoryChange = (cat: string) => {
        setCategory(cat);
        setVisibleCount(VIDEOS_PER_PAGE);
    };

    return (
        <PageTransition>
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-10 xl:px-16 min-h-screen">
                <ScrollReveal>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
                        PORT<span className="text-accent">FOLIO</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                    <SearchBar value={search} onChange={setSearch} />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                    <CategoryFilter selected={category} onChange={handleCategoryChange} />
                </ScrollReveal>

                {filteredVideos.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-text-muted text-lg mb-4">
                            Aucune vidéo trouvée pour &ldquo;{search}&rdquo;
                        </p>
                        <button
                            onClick={() => { setSearch(''); setCategory('all'); }}
                            className="px-6 py-3 bg-accent text-background font-semibold rounded-full hover:bg-accent/90 transition-all"
                        >
                            Réinitialiser la recherche
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-12 md:space-y-16 mt-8">
                            <AnimatePresence mode="popLayout">
                                {displayedVideos.map((video, index) => (
                                    <CinematicCard key={video.slug} video={video} index={index} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {hasMore && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + VIDEOS_PER_PAGE)}
                                    className="px-8 py-3 border border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-all font-medium"
                                >
                                    Charger plus
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </PageTransition>
    );
}

