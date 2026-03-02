'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { videos } from '@/data/videos';
import VideoPlayer from '@/components/shared/VideoPlayer';
import RelatedVideos from '@/components/portfolio/RelatedVideos';
import PageTransition from '@/components/layout/PageTransition';
import ScrollReveal from '@/components/shared/ScrollReveal';
import { FaArrowLeft } from 'react-icons/fa';

export default function VideoDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const video = videos.find((v) => v.slug === slug);

    if (!video) {
        return (
            <PageTransition>
                <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-heading font-bold mb-4">Vidéo non trouvée</h1>
                    <Link href="/portfolio" className="text-accent hover:text-accent/80 transition-colors">
                        &larr; Retour au portfolio
                    </Link>
                </main>
            </PageTransition>
        );
    }

    const relatedVideos = video.relatedSlugs
        .map((s) => videos.find((v) => v.slug === s))
        .filter(Boolean) as typeof videos;

    return (
        <PageTransition>
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Back button */}
                <ScrollReveal>
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-6"
                    >
                        <FaArrowLeft size={14} />
                        Retour au portfolio
                    </Link>
                </ScrollReveal>

                {/* Video player */}
                <ScrollReveal>
                    <VideoPlayer src={video.videoUrl} poster={video.thumbnail} />
                </ScrollReveal>

                {/* Info */}
                <ScrollReveal delay={0.2}>
                    <div className="mt-8">
                        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{video.title}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <Link
                                href={`/portfolio?category=${video.category}`}
                                className="px-3 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full hover:bg-accent/30 transition-colors capitalize"
                            >
                                {video.category}
                            </Link>
                            <span className="text-text-muted text-sm">
                                {new Date(video.date).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                        </div>
                        <p className="text-text-muted leading-relaxed max-w-3xl">{video.description}</p>
                    </div>
                </ScrollReveal>

                {/* Related */}
                <RelatedVideos videos={relatedVideos} />
            </main>
        </PageTransition>
    );
}

