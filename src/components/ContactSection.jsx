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
    const whatsappLink = 'https://wa.me/5551981951175';

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
                    Pronto para decolar?
                </AnimatedText>
                <AnimatedText as="p" className="section-subtitle" delay={0.2}>
                    Converse com um dos nossos estrategistas e descubra como o Ecossistema VOY pode transformar atenção em oportunidades, oportunidades em crescimento e crescimento em resultados consistentes para o seu negócio.
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
                    href="mailto:contato@voycompany.io"
                    className="contact-card"
                >
                    <Mail size={36} />
                    <h3>E-mail</h3>
                    <p>contato@voycompany.io</p>
                </a>

                <div className="contact-card">
                    <MapPin size={36} />
                    <h3>Localização</h3>
                    <p>Atendimento 100% remoto em todo Mundo</p>
                </div>
            </div>
        </section>
    );
}
