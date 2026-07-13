import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { useLenisScroll } from './SmoothScroll';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function HeroSection() {
    const sectionRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnRef = useRef(null);
    const lenisRef = useLenisScroll();
    const prefersReducedMotion = usePrefersReducedMotion();

    const lines = [
        { words: ['A', 'Voy', 'sempre', 'soube', 'criar.'] },
        { words: ['Agora', 'ela', 'também', 'constrói', 'o', { text: 'crescimento.', accent: true }] },
    ];

    useEffect(() => {
        if (prefersReducedMotion) {
            gsap.set([sectionRef.current.querySelectorAll('.hero-word'), subtitleRef.current, btnRef.current], { opacity: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Word-by-word reveal
            const words = sectionRef.current.querySelectorAll('.hero-word');
            tl.to(words, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power4.out',
                stagger: 0.06,
            }, '-=0.2');

            // Subtitle fade in
            tl.fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
                '-=0.3'
            );

            // Button
            tl.fromTo(btnRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
                '-=0.4'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [prefersReducedMotion]);

    const scrollToContact = () => {
        const el = document.querySelector('#contato');
        if (lenisRef?.current) {
            lenisRef.current.scrollTo(el);
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="hero" ref={sectionRef}>
            <h1 className="hero-title">
                {lines.map((line, i) => (
                    <span className="hero-line" key={i}>
                        {line.words.map((word, j) => {
                            const text = typeof word === 'string' ? word : word.text;
                            const isAccent = typeof word === 'object' && word.accent;
                            return (
                                <span key={j}>
                                    <span className={`hero-word ${isAccent ? 'accent' : ''}`}>
                                        {text}
                                    </span>
                                    {j < line.words.length - 1 && '\u00A0'}
                                </span>
                            );
                        })}
                    </span>
                ))}
            </h1>

            <p ref={subtitleRef} style={{ opacity: 0 }}>
                A Voy Company é a estrutura de performance da Voy: tráfego, conversão,
                automação e inteligência operacional integrados em uma só operação,
                com o mesmo padrão que já atende Globo, Dell e Cyrela.
            </p>

            <div ref={btnRef} style={{ opacity: 0 }}>
                <MagneticButton
                    className="cta-btn cta-btn-glow"
                    onClick={() => window.open('https://wa.me/555181951175', '_blank')}
                    aria-label="Falar com a VOY — ir para contato"
                >
                    Falar com a VOY
                </MagneticButton>
            </div>
        </section>
    );
}