import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * CountUp — Animated number counter
 * @param {number} end - Target number
 * @param {string} prefix - Text before number (e.g., "R$")
 * @param {string} suffix - Text after number (e.g., "%", "M+", "+")
 * @param {number} duration - Animation duration in seconds
 * @param {number} decimals - Number of decimal places
 */
export default function CountUp({
    end,
    prefix = '',
    suffix = '',
    duration = 2.5,
    decimals = 0,
}) {
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
                if (hasAnimated.current) return;
                hasAnimated.current = true;

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: end,
                    duration,
                    ease: 'power2.out',
                    onUpdate: () => {
                        el.textContent = prefix + (decimals > 0
                            ? obj.val.toFixed(decimals)
                            : Math.round(obj.val)) + suffix;
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [end, prefix, suffix, duration, decimals]);

    return (
        <span ref={ref} className="count-up">
            {prefix}0{suffix}
        </span>
    );
}
