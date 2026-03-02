import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/layout/CustomCursor';
import SplashScreen from '@/components/layout/SplashScreen';

export const metadata: Metadata = {
    title: 'BOB | José Randrianaivo - Filmmaker & Vidéaste',
    description: 'Filmmaker et vidéaste basé à Antananarivo, Madagascar. Spécialisé en mariages, vidéos corporate, clips musicaux et prises de vues drone.',
    keywords: ['vidéaste', 'filmmaker', 'Madagascar', 'mariage', 'corporate', 'drone', 'clip musical', 'Antananarivo'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className="font-body antialiased">
                <SplashScreen />
                <CustomCursor />
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}


