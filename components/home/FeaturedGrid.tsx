'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { videos } from '@/data/videos';
import ScrollReveal from '@/components/shared/ScrollReveal';

const featuredVideos = videos.filter((v) => v.featured).slice(0, 5);

function VideoCard({ video, index, className }: { video: typeof featuredVideos[0]; index: number; className?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

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
        <ScrollReveal delay={index * 0.1} className={className}>
            <Link href={`/portfolio/${video.slug}`} className="block h-full">
                <div className="flex flex-col h-full">
                    {/* Video */}
                    <motion.div
                        className="relative overflow-hidden rounded-lg cursor-pointer flex-1 min-h-[200px] group"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className={`object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                            onContextMenu={(e) => e.preventDefault()}
                            draggable={false}
                        />
                        <video
                            ref={videoRef}
                            src={video.videoUrl}
                            muted
                            loop
                            playsInline
                            controlsList="nodownload"
                            disablePictureInPicture
                            onContextMenu={(e) => e.preventDefault()}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                            onPlaying={() => isHovering && setVideoReady(true)}
                        />
                    </motion.div>

                    {/* Description */}
                    <div className="py-4 px-1">
                        <span className="text-xs text-accent font-medium uppercase tracking-wider">{video.category}</span>
                        <h3 className="text-base font-heading font-semibold text-text-primary mt-1">{video.title}</h3>
                        <p className="text-sm text-text-muted mt-1 line-clamp-2">{video.description}</p>
                    </div>
                </div>
            </Link>
        </ScrollReveal>
    );
}

export default function FeaturedGrid() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-10 xl:px-16">
            <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
                    MES <span className="text-accent">RÉALISATIONS</span>
                </h2>
            </ScrollReveal>

            {/* Desktop: Asymmetric grid */}
            <div className="hidden lg:grid lg:grid-cols-[3fr_2fr] gap-6 min-h-[700px]">
                {/* Left: Video 1 grande */}
                <VideoCard video={featuredVideos[0]} index={0} />

                {/* Right: Video 2 + Video 3 empilées */}
                <div className="grid grid-rows-2 gap-6">
                    <VideoCard video={featuredVideos[1]} index={1} />
                    <VideoCard video={featuredVideos[2]} index={2} />
                </div>
            </div>

            {/* Desktop: Row 2 */}
            <div className="hidden lg:grid lg:grid-cols-[2fr_3fr] gap-6 mt-6 min-h-[400px]">
                <VideoCard video={featuredVideos[3]} index={3} />
                <VideoCard video={featuredVideos[4]} index={4} />
            </div>

            {/* Tablet: 2 columns */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:hidden gap-6">
                {featuredVideos.map((video, index) => (
                    <VideoCard key={video.slug} video={video} index={index} className="min-h-[300px]" />
                ))}
            </div>

            {/* Mobile: 1 column */}
            <div className="sm:hidden space-y-6">
                {featuredVideos.map((video, index) => (
                    <VideoCard key={video.slug} video={video} index={index} className="min-h-[250px]" />
                ))}
            </div>

            <ScrollReveal className="text-center mt-12">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                >
                    Voir tout le portfolio
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </Link>
            </ScrollReveal>
        </section>
    );
}

