import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import AnimatedText from './AnimatedText';
import CountUp from './CountUp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: <TrendingUp size={28} />, end: 347, suffix: '%', label: 'Aumento médio em ROAS' },
    { icon: <DollarSign size={28} />, end: 2.8, prefix: 'R$', suffix: 'M+', decimals: 1, label: 'Faturamento gerado' },
    { icon: <Users size={28} />, end: 50, suffix: '+', label: 'Empresas atendidas' },
    { icon: <Award size={28} />, end: 98, suffix: '%', label: 'Taxa de retenção' },
];

export default function ResultsSection() {
    const gridRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const cards = gridRef.current.querySelectorAll('.stat-card');

            gsap.fromTo(cards,
                { opacity: 0, scale: 0.85, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <section className="results-section" id="resultados">
            <div className="section-header">
                <span className="section-tag">Resultados Reais</span>
                <AnimatedText as="h2">
                    Números que falam por si
                </AnimatedText>
                <AnimatedText as="p" className="section-subtitle" delay={0.2}>
                    Não prometemos — entregamos. Esses são os resultados médios dos nossos clientes nos últimos 12 meses.
                </AnimatedText>
            </div>

            <div className="stats-grid" ref={gridRef}>
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-icon">{stat.icon}</div>
                        <span className="stat-value">
                            <CountUp
                                end={stat.end}
                                prefix={stat.prefix || ''}
                                suffix={stat.suffix || ''}
                                decimals={stat.decimals || 0}
                            />
                        </span>
                        <span className="stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
