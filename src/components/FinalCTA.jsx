import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';
import { useLenisScroll } from './SmoothScroll';

export default function FinalCTA() {
    const lenisRef = useLenisScroll();

    const scrollToContact = () => {
        const el = document.querySelector('#contato');
        if (lenisRef?.current) {
            lenisRef.current.scrollTo(el);
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="final-cta">
            <div className="final-cta-glow" aria-hidden="true" />
            <div className="final-cta-content">
                <AnimatedText as="h2" className="final-cta-title" splitBy="words">
                    Sua empresa não precisa de mais ferramentas.
                </AnimatedText>
                <AnimatedText as="p" className="final-cta-subtitle" splitBy="words" delay={0.3}>
                    Precisa de uma estratégia onde tudo trabalhe na mesma direção.
                </AnimatedText>
                <MagneticButton
                    className="cta-btn cta-btn-glow"
                    onClick={() => window.open('https://wa.me/5551981951175', '_blank')}
                    aria-label="Quero resultados reais — ir para contato"
                >
                    Quero Resultados Reais
                </MagneticButton>
            </div>
        </section>
    );
}
