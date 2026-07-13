import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Check for touch device
        if (window.matchMedia('(hover: none)').matches) return;

        const moveCursor = (e) => {
            gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
        };

        const grow = () => {
            gsap.to(ring, { scale: 2.5, opacity: 0.3, duration: 0.3, ease: 'power2.out' });
            gsap.to(dot, { scale: 0, duration: 0.3 });
        };

        const shrink = () => {
            gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
            gsap.to(dot, { scale: 1, duration: 0.3 });
        };

        window.addEventListener('mousemove', moveCursor);

        // Use event delegation for interactive elements
        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, .magnetic-btn, .navbar-link, .contact-card')) {
                grow();
            }
        };
        const handleMouseOut = (e) => {
            if (e.target.closest('a, button, .magnetic-btn, .navbar-link, .contact-card')) {
                shrink();
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    );
}
