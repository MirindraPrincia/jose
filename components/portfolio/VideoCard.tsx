'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Video } from '@/data/videos';

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
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
        <Link href={`/portfolio/${video.slug}`}>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Thumbnail */}
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                />

                {/* Video preview */}
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

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <span className="inline-block px-2 py-0.5 bg-accent/90 text-background text-xs font-medium rounded-full mb-2 capitalize">
                        {video.category}
                    </span>
                    <h3 className="text-white font-heading font-semibold">{video.title}</h3>
                    <p className="text-white/60 text-sm mt-1">{video.date}</p>
                </div>

                {/* Play icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-12 h-12 bg-accent/80 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-background ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
