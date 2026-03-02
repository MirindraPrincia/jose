'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Video } from '@/data/videos';
import ScrollReveal from '@/components/shared/ScrollReveal';

interface RelatedVideosProps {
    videos: Video[];
}

function RelatedCard({ video }: { video: Video }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [videoReady, setVideoReady] = useState(false);

    return (
        <Link href={`/portfolio/${video.slug}`} className="flex-shrink-0 w-[280px] md:w-auto">
            <div
                className="relative aspect-video overflow-hidden rounded-lg group"
                onMouseEnter={() => {
                    setIsHovering(true);
                    videoRef.current?.play();
                }}
                onMouseLeave={() => {
                    setIsHovering(false);
                    setVideoReady(false);
                    if (videoRef.current) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }}
            >
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 768px) 280px, 33vw"
                />
                <video
                    ref={videoRef}
                    src={video.videoUrl}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                    onPlaying={() => isHovering && setVideoReady(true)}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all z-10">
                    <span className="text-xs text-accent capitalize">{video.category}</span>
                    <h4 className="text-white text-sm font-heading font-semibold">{video.title}</h4>
                </div>
            </div>
        </Link>
    );
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
    if (videos.length === 0) return null;

    return (
        <section className="py-16">
            <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
                    VIDÉOS <span className="text-accent">SIMILAIRES</span>
                </h2>
            </ScrollReveal>

            {/* Desktop: 3 columns grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-4">
                {videos.map((video, i) => (
                    <ScrollReveal key={video.slug} delay={i * 0.1}>
                        <RelatedCard video={video} />
                    </ScrollReveal>
                ))}
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide">
                {videos.map((video) => (
                    <div key={video.slug} className="snap-start">
                        <RelatedCard video={video} />
                    </div>
                ))}
            </div>
        </section>
    );
}

