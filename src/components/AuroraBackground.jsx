import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/*
 * Aurora de fitas em Canvas 2D.
 * Substitui o shader WebGL original mantendo o visual de bandas fluidas,
 * sem o custo do Three.js. Tecnica: desenha em um canvas offscreen de
 * baixa resolucao e faz upscale, o que gera o blur suave de graca.
 * Sob prefers-reduced-motion renderiza um unico frame estatico.
 */

const RIBBONS = [
    { hue: 'rgba(0, 255, 170,', baseY: 0.30, amp: 0.10, freq: 1.6, speed: 0.06, width: 0.16, alpha: 0.55 },
    { hue: 'rgba(46, 242, 197,', baseY: 0.42, amp: 0.14, freq: 1.1, speed: 0.045, width: 0.22, alpha: 0.38 },
    { hue: 'rgba(0, 140, 255,', baseY: 0.58, amp: 0.12, freq: 1.9, speed: 0.075, width: 0.18, alpha: 0.30 },
    { hue: 'rgba(120, 80, 255,', baseY: 0.72, amp: 0.08, freq: 1.3, speed: 0.05, width: 0.14, alpha: 0.18 },
];

const SCALE = 0.12; // resolucao do offscreen (12% da tela): blur natural no upscale

export default function AuroraBackground() {
    const canvasRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const off = document.createElement('canvas');
        const octx = off.getContext('2d');

        let w = 0, h = 0, ow = 0, oh = 0;
        let frameId = null;
        let running = false;

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            ow = off.width = Math.max(96, Math.floor(w * SCALE));
            oh = off.height = Math.max(64, Math.floor(h * SCALE));
        };

        const drawFrame = (t) => {
            octx.clearRect(0, 0, ow, oh);
            octx.globalCompositeOperation = 'lighter';

            for (const r of RIBBONS) {
                octx.beginPath();
                octx.moveTo(0, oh);
                for (let x = 0; x <= ow; x += 2) {
                    const nx = x / ow;
                    const y = oh * r.baseY
                        + Math.sin(nx * Math.PI * r.freq + t * r.speed) * oh * r.amp
                        + Math.sin(nx * Math.PI * r.freq * 2.7 + t * r.speed * 1.6) * oh * r.amp * 0.35;
                    octx.lineTo(x, y);
                }
                octx.lineTo(ow, oh);
                octx.closePath();

                const gradTop = oh * (r.baseY - r.width);
                const grad = octx.createLinearGradient(0, gradTop, 0, oh * (r.baseY + r.width * 2));
                grad.addColorStop(0, r.hue + '0)');
                grad.addColorStop(0.45, r.hue + String(r.alpha) + ')');
                grad.addColorStop(1, r.hue + '0)');
                octx.fillStyle = grad;
                octx.fill();
            }

            ctx.clearRect(0, 0, w, h);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(off, 0, 0, ow, oh, 0, 0, w, h);
        };

        const loop = (now) => {
            frameId = requestAnimationFrame(loop);
            drawFrame(now / 1000);
        };

        const start = () => {
            if (running || prefersReducedMotion) return;
            running = true;
            frameId = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            if (frameId) cancelAnimationFrame(frameId);
            frameId = null;
        };

        const onVisibility = () => {
            if (document.hidden) { stop(); } else { start(); }
        };

        resize();
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', onVisibility);

        if (prefersReducedMotion) {
            drawFrame(12); // frame estatico com as fitas visiveis
        } else {
            start();
        }

        return () => {
            stop();
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [prefersReducedMotion]);

    return (
        <div className="aurora-container" aria-hidden="true">
            <canvas ref={canvasRef} className="aurora-canvas" />
        </div>
    );
}
