import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set('.footer-inner > *', { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.fromTo('.footer-inner > *',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    return (
        <footer className="site-footer" ref={footerRef}>
            <div className="footer-inner">
                <div className="footer-brand">
                    <img src="/2-voy-company.webp" alt="VOY Logo" className="footer-logo" loading="lazy" />
                    <p>Tráfego pago de alta performance.<br />Resultados reais, sem métricas de vaidade.</p>
                </div>

                <div className="footer-links">
                    <h4>Navegação</h4>
                    <a href="#hero">Início</a>
                    <a href="#ecossistema">Método</a>
                    <a href="#resultados">Resultados</a>
                    <a href="#contato">Contato</a>
                </div>

                <div className="footer-social">
                    <h4>Redes Sociais</h4>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/voycompany/" target="_blank" rel="noopener noreferrer" aria-label="Instagram da VOY">
                            <Instagram size={20} />
                        </a>
                        <a href="https://www.instagram.com/produtoravoy" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Produtora VOY">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 VOY TRÁFEGO PAGO. TODOS OS DIREITOS RESERVADOS.</p>
            </div>
        </footer>
    );
}
