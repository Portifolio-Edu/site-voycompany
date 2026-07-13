import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const logos = [
    { id: 1, px: 0, py: 0 },
    { id: 2, px: 25, py: 100 },
    { id: 3, px: 50, py: 100 },
    { id: 4, px: 100, py: 0 },
    { id: 5, px: 0, py: 100 },
    { id: 6, px: 25, py: 0 },
    { id: 7, px: 75, py: 0 },
    { id: 8, px: 50, py: 0 }, // iGUi instead of Budweiser
    { id: 9, px: 100, py: 100 },
    { id: 10, px: 75, py: 100 },
];

export default function ClientsSection() {
    const sectionRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set('.section-label', { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo('.section-label',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section className="clients-section" ref={sectionRef}>
            {/* Faixa 2: Serviços (Direita) */}
            <div className="marquee-container services-marquee">
                <div className="marquee-track reverse">
                    <div className="services-text">
                        <span>LANDING PAGES</span> <span className="asterisk">✳</span>
                        <span>CONSULTORIA ESTRATÉGICA</span> <span className="asterisk">✳</span>
                        <span className="outlined">AUTOMAÇÕES</span> <span className="asterisk">✳</span>
                        <span>AGENTES DE IA</span> <span className="asterisk">✳</span>
                    </div>
                    <div className="services-text" aria-hidden="true">
                        <span>LANDING PAGES</span> <span className="asterisk">✳</span>
                        <span>CONSULTORIA ESTRATÉGICA</span> <span className="asterisk">✳</span>
                        <span className="outlined">AUTOMAÇÕES</span> <span className="asterisk">✳</span>
                        <span>AGENTES DE IA</span> <span className="asterisk">✳</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
