import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Clientes reais da Voy (mesma prova social citada no Hero: "mesmo padrao
// que ja atende Globo, Dell e Cyrela"). Lista em texto por garantia de
// funcionamento; trocar por <img> usando .marquee-track img (ja existe no
// CSS) se os arquivos de logo forem fornecidos.
const clients = [
    'GLOBO', 'DELL', 'CYRELA', 'CCR', 'NET', 'BRANRI',
    'CHILLI BEANS', 'MELNICK', 'MARINA', 'IGUI', 'ATM',
];

export default function ClientsSection() {
    const sectionRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            // Nenhum GSAP alvo na inicialização se não houver mais .section-label
        }, sectionRef);
        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section className="clients-section" ref={sectionRef}>
            {/* Faixa 1: Clientes (Esquerda) */}
            <div className="marquee-container logos-marquee">
                <div className="marquee-track">
                    <div className="clients-text">
                        {clients.map((name) => (
                            <span key={name}>
                                {name} <span className="asterisk">✳</span>
                            </span>
                        ))}
                    </div>
                    <div className="clients-text" aria-hidden="true">
                        {clients.map((name) => (
                            <span key={`${name}-dup`}>
                                {name} <span className="asterisk">✳</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

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
