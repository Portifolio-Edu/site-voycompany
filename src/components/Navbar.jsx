import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenisScroll } from './SmoothScroll';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const lenisRef = useLenisScroll();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <motion.nav
            className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="navbar-inner">
                <img src="/2 VOY COMPANY.png" alt="VOY Logo" className="navbar-logo" />

                <div className="navbar-links">
                    {links.map((link) => (
                        <button key={link.href} onClick={() => scrollTo(link.href)} className="navbar-link">
                            {link.label}
                        </button>
                    ))}
                    <button onClick={() => scrollTo('#contato')} className="navbar-cta">
                        Falar com a VOY
                    </button>
                </div>

                <button
                    className="navbar-hamburger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Abrir menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="navbar-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {links.map((link) => (
                            <button key={link.href} onClick={() => scrollTo(link.href)} className="navbar-mobile-link">
                                {link.label}
                            </button>
                        ))}
                        <button onClick={() => scrollTo('#contato')} className="navbar-mobile-cta">
                            Falar com a VOY
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
