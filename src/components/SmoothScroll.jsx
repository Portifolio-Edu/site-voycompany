import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const LenisContext = createContext(null);
export const useLenisScroll = () => useContext(LenisContext);

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        // If reduced motion is preferred, don't initialize Lenis
        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        // Save reference to the callback to correctly remove it later
        const updateLenis = (time) => {
            lenis.raf(time * 1000);
        };
        
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateLenis);
            lenis.destroy();
        };
    }, [prefersReducedMotion]);

    return (
        <LenisContext.Provider value={lenisRef}>
            {children}
        </LenisContext.Provider>
    );
}
