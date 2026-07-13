import './styles.css';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import AuroraBackground from './components/AuroraBackground';
import AstronautScene from './components/AstronautScene';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClientsSection from './components/ClientsSection';
import EcosystemTimeline from './components/EcosystemTimeline';
import ResultsSection from './components/ResultsSection';
import ContactSection from './components/ContactSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    useEffect(() => {
        // Refresh ScrollTrigger after all content is loaded
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <SmoothScroll>

            {/* CAMADA 0: Aurora Boreal no fundo fixo */}
            <AuroraBackground />

            {/* CAMADA 1: Astronauta flutuando por cima da Aurora */}
            <AstronautScene />

            {/* CAMADA 2: Conteúdo do site rolando na frente de tudo */}
            <main className="content-wrapper">
                <Navbar />
                <HeroSection />
                <ClientsSection />
                <EcosystemTimeline />
                <ResultsSection />
                <div className="section-divider" />
                <ContactSection />
                <div className="section-divider" />
                <FinalCTA />
                <Footer />
            </main>
        </SmoothScroll>
    );
}