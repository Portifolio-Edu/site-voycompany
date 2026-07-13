import { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '', onClick, strength = 0.3, ...props }) {
    const btnRef = useRef(null);

    const handleMouseMove = (e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        gsap.to(btnRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)',
        });
    };

    return (
        <button
            ref={btnRef}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            {...props}
        >
            <span className="magnetic-btn-text">{children}</span>
        </button>
    );
}
