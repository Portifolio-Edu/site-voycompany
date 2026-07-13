import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, BarChart3 } from 'lucide-react';
import AnimatedText from './AnimatedText';

gsap.registerPlugin(ScrollTrigger);

export default function ImpactGrid() {
    const gridRef = useRef(null);

    const cards = [
        {
            icon: <Target size={36} />,
            title: 'Mira Cirúrgica',
            text: 'Não gastamos 1 centavo com pessoas erradas. Nossa segmentação busca exatamente quem tem o perfil do seu cliente ideal.',
        },
        {
            icon: <Zap size={36} />,
            title: 'Criativos Vorazes',
            text: 'Nossos designs e copies quebram o padrão do seu nicho. Eles param o polegar do usuário no feed instantaneamente.',
        },
        {
            icon: <BarChart3 size={36} />,
            title: 'ROI Inegável',
            text: 'Relatórios claros, sem enrolação. Você sabe exatamente quanto investiu e quanto voltou em lucro no seu PIX.',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cardElements = gridRef.current.querySelectorAll('.impact-card');

            gsap.fromTo(cardElements,
                { opacity: 0, y: 60, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="impact-section" id="metodo">
            <div className="section-header">
                <span className="section-tag">Nosso Método</span>
                <AnimatedText as="h2">
                    Estratégia que gera resultado
                </AnimatedText>
            </div>
            <div className="impact-grid" ref={gridRef}>
                {cards.map((card, index) => (
                    <div key={index} className="impact-card">
                        <div className="impact-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
