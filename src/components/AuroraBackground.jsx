import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

export default function AuroraBackground() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanupFn = null;

    // Lazy import: o three sai do chunk principal e carrega em paralelo,
    // imperceptivel para um background e mantem o first paint leve.
    import('three').then((THREE) => {
      if (disposed) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'low-power' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
                uniform float iTime;
                uniform vec2 iResolution;
                #define NUM_OCTAVES 3
                float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
                float noise(vec2 p) {
                    vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u);
                    float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
                    return res * res;
                }
                float fbm(vec2 x) {
                    float v = 0.0; float a = 0.3; vec2 shift = vec2(100);
                    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
                    for (int i = 0; i < NUM_OCTAVES; ++i) { v += a * noise(x); x = rot * x * 2.0 + shift; a *= 0.4; }
                    return v;
                }
                void main() {
                    vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
                    vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
                    vec2 v; vec4 o = vec4(0.0); float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;
                    for (float i = 0.0; i < 25.0; i++) {
                        v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
                        float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 25.0));
                        vec4 auroraColors = vec4(0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4), 0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5), 0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3), 1.0);
                        vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
                        float thinnessFactor = smoothstep(0.0, 1.0, i / 25.0) * 0.6;
                        o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
                    }
                    o = tanh(pow(o / 80.0, vec4(1.6)));
                    gl_FragColor = o * 1.5;
                }
            `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value = performance.now() / 1000;
      renderer.render(scene, camera);
    };
    if (prefersReducedMotion) {
      material.uniforms.iTime.value = 8.0;
      renderer.render(scene, camera); // frame unico estatico
    } else {
      animate();
    }

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    cleanupFn = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', handleResize);
        if (container && renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      if (cleanupFn) cleanupFn();
    };
  }, [prefersReducedMotion]);

  return <div ref={containerRef} className="bg-layer bg-aurora" aria-hidden="true" />;
}