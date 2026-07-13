import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedText — Premium text reveal animation
 * @param {string} as - HTML tag (h1, h2, p, span)
 * @param {'words'|'chars'} splitBy - Split type
 * @param {'scroll'|'mount'} trigger - When to animate
 * @param {number} delay - Delay in seconds
 * @param {string} className - CSS class
 */
export default function AnimatedText({
    children,
    as: Tag = 'h2',
    splitBy = 'words',
    trigger = 'scroll',
    delay = 0,
    className = '',
    staggerAmount = 0.04,
}) {
    const ref = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        const el = ref.current;
        if (!el) return;

        // Wait for fonts to load
        document.fonts.ready.then(() => {
            const split = new SplitType(el, {
                types: splitBy === 'chars' ? 'words, chars' : 'words',
            });

            const targets = splitBy === 'chars' ? split.chars : split.words;
            if (!targets || targets.length === 0) return;

            // Set initial state
            gsap.set(targets, {
                y: '100%',
                opacity: 0,
                rotateX: -40,
            });

            const animConfig = {
                y: '0%',
                opacity: 1,
                rotateX: 0,
                duration: 0.9,
                ease: 'power4.out',
                stagger: staggerAmount,
                delay,
            };

            if (trigger === 'scroll') {
                gsap.to(targets, {
                    ...animConfig,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
            } else {
                gsap.to(targets, animConfig);
            }

            return () => {
                split.revert();
            };
        });
    }, [splitBy, trigger, delay, staggerAmount, prefersReducedMotion]);

    return (
        <Tag
            ref={ref}
            className={`animated-text ${className}`}
            style={{ perspective: '600px' }}
        >
            {children}
        </Tag>
    );
}
