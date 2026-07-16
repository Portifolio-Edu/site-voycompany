import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Logos reais dos clientes da Voy (mesma prova social citada no Hero:
// "mesmo padrao que ja atende Globo, Dell e Cyrela"). Arquivos em
// /public/logos, recortados individualmente para rodar cada um separado
// na marquee (nao um bloco unico).
const clients = [
    { name: 'Globo', file: 'globo.png' },
    { name: 'Melnick Even', file: 'melnickeven.png' },
    { name: 'iGUi', file: 'igui.png' },
    { name: 'Marina Park', file: 'marinapark.png' },
    { name: 'Dell Technologies', file: 'dell.png' },
    { name: 'Chilli Beans', file: 'chillibeans.png' },
    { name: 'CCR ViaSul', file: 'ccrviasul.png' },
    { name: 'Banrisul', file: 'banrisul.png' },
    { name: 'Netshoes', file: 'netshoes.png' },
    { name: 'Cyrela Goldsztein', file: 'cyrela.png' },
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
                    <div className="logos-track-inner">
                        {clients.map((c) => (
                            <img
                                key={c.file}
                                src={`/logos/${c.file}`}
                                alt={c.name}
                                loading="lazy"
                            />
                        ))}
                    </div>
                    <div className="logos-track-inner" aria-hidden="true">
                        {clients.map((c) => (
                            <img
                                key={`${c.file}-dup`}
                                src={`/logos/${c.file}`}
                                alt=""
                                loading="lazy"
                            />
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
