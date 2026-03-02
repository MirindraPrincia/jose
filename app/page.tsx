import HeroSection from '@/components/home/HeroSection';
import FeaturedGrid from '@/components/home/FeaturedGrid';
import CreativeCTA from '@/components/home/CreativeCTA';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <FeaturedGrid />
            <CreativeCTA />
            <CTASection />
        </main>
    );
}
