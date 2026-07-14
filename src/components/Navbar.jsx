import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import { useLenisScroll } from './SmoothScroll';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lenisRef = useLenisScroll();
    const navRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // Initial entrance animation
        if (!prefersReducedMotion) {
            gsap.fromTo(navRef.current, 
                { y: -80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
        } else {
            gsap.set(navRef.current, { y: 0, opacity: 1 });
        }

        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) {
            if (mobileOpen) {
                gsap.set(mobileMenuRef.current, { height: 'auto', opacity: 1 });
            } else {
                gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 });
            }
            return;
        }

        if (mobileOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        } else if (mobileMenuRef.current) {
            gsap.to(mobileMenuRef.current,
                { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" }
            );
        }
    }, [mobileOpen, prefersReducedMotion]);

    const links = [
        { label: 'Início', href: '#hero' },
        { label: 'Método', href: '#ecossistema' },
        { label: 'Resultados', href: '#resultados' },
        { label: 'Contato', href: '#contato' },
    ];

    const scrollTo = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (lenisRef?.current) {
            lenisRef.current.scrollTo(el);
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            ref={navRef}
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        >
            <div className="navbar-inner">
                <img src="/2-voy-company.webp" alt="VOY Logo" className="navbar-logo" />

                <nav className="navbar-links" aria-label="Navegação principal">
                    {links.map((link) => (
                        <button key={link.href} onClick={() => scrollTo(link.href)} className="navbar-link">
                            {link.label}
                        </button>
                    ))}
                    <button onClick={() => window.open('https://wa.me/555181951175', '_blank')} className="navbar-cta">
                        Falar com a VOY
                    </button>
                </nav>

                <button
                    className="navbar-hamburger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-expanded={mobileOpen}
                    aria-label="Abrir menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div 
                className="navbar-mobile" 
                ref={mobileMenuRef}
                style={{ overflow: 'hidden', height: 0, opacity: 0 }}
                aria-hidden={!mobileOpen}
            >
                {links.map((link) => (
                    <button key={link.href} onClick={() => scrollTo(link.href)} className="navbar-mobile-link">
                        {link.label}
                    </button>
                ))}
                <button onClick={() => window.open('https://wa.me/555181951175', '_blank')} className="navbar-mobile-cta">
                    Falar com a VOY
                </button>
            </div>
        </header>
    );
}
