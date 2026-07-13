import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);

    useEffect(() => {
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
    }, []);

    return (
        <footer className="site-footer" ref={footerRef}>
            <div className="footer-inner">
                <div className="footer-brand">
                    <img src="/2 VOY COMPANY.png" alt="VOY Logo" className="footer-logo" />
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
                        <a href="https://instagram.com/voytrafego" target="_blank" rel="noopener noreferrer" aria-label="Instagram da VOY">
                            <Instagram size={20} />
                        </a>
                        <a href="https://linkedin.com/company/voytrafego" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da VOY">
                            <Linkedin size={20} />
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
