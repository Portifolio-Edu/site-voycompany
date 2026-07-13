import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import AnimatedText from './AnimatedText';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const gridRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const whatsappLink = 'https://wa.me/5500000000000?text=Olá!%20Quero%20escalar%20meu%20faturamento%20com%20a%20VOY';

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set('.contact-card', { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            const cards = gridRef.current.querySelectorAll('.contact-card');

            gsap.fromTo(cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
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
        <section className="contact-section" id="contato">
            <div className="section-header">
                <span className="section-tag">Contato</span>
                <AnimatedText as="h2">
                    Pronto para escalar?
                </AnimatedText>
                <AnimatedText as="p" className="section-subtitle" delay={0.2}>
                    Fale agora com um dos nossos estrategistas e descubra quanto sua empresa pode faturar a mais.
                </AnimatedText>
            </div>

            <div className="contact-grid" ref={gridRef}>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card contact-card-main"
                >
                    <MessageCircle size={36} />
                    <h3>WhatsApp</h3>
                    <p>Resposta em até 5 minutos</p>
                    <span className="contact-btn">Iniciar Conversa →</span>
                </a>

                <a
                    href="mailto:contato@voytrafego.com"
                    className="contact-card"
                >
                    <Mail size={36} />
                    <h3>E-mail</h3>
                    <p>contato@voytrafego.com</p>
                </a>

                <div className="contact-card">
                    <MapPin size={36} />
                    <h3>Localização</h3>
                    <p>Atendimento 100% remoto em todo Brasil</p>
                </div>
            </div>
        </section>
    );
}
