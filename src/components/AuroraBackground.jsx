import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function AuroraBackground() {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <div className="aurora-container" aria-hidden="true">
            {!prefersReducedMotion && (
                <>
                    <div className="aurora-blob aurora-1"></div>
                    <div className="aurora-blob aurora-2"></div>
                    <div className="aurora-blob aurora-3"></div>
                </>
            )}
        </div>
    );
}