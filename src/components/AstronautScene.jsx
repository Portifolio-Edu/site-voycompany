import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function AstronautScene() {
    const containerRef = useRef(null);
    const astronautRef = useRef(null);
    const asteroidRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        let frameId;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            if (astronautRef.current) {
                // Parallax subtle movement
                const astroX = targetX * -30;
                const astroY = targetY * 30;
                astronautRef.current.style.transform = `translate(${astroX}px, ${astroY}px)`;
            }

            if (asteroidRef.current) {
                // Parallax opposite direction
                const asteroidX = targetX * 50;
                const asteroidY = targetY * -50;
                asteroidRef.current.style.transform = `translate(${asteroidX}px, ${asteroidY}px)`;
            }

            frameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, [prefersReducedMotion]);

    return (
        <div className="astronaut-scene" ref={containerRef} aria-hidden="true">
            <img 
                ref={asteroidRef}
                src="/asteroidevoy.webp" 
                alt="" 
                className="scene-asteroid" 
                loading="lazy" 
            />
            <img 
                ref={astronautRef}
                src="/astronautavoy.webp" 
                alt="" 
                className="scene-astronaut" 
                loading="lazy" 
            />
        </div>
    );
}