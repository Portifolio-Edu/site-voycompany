import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AstronautScene() {
    const mountRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const width = window.innerWidth;
        const height = window.innerHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        
        // Astronaut (Right side)
        const astronautTexture = textureLoader.load("/astronautavoy.png");
        const astronautGeometry = new THREE.PlaneGeometry(2.5, 2.5);
        const astronautMaterial = new THREE.MeshBasicMaterial({ map: astronautTexture, transparent: true });
        const astronautMesh = new THREE.Mesh(astronautGeometry, astronautMaterial);
        scene.add(astronautMesh);

        // Asteroid (Left side)
        const asteroidTexture = textureLoader.load("/asteroidevoy.png");
        const asteroidGeometry = new THREE.PlaneGeometry(3.0, 3.0);
        const asteroidMaterial = new THREE.MeshBasicMaterial({ map: asteroidTexture, transparent: true, color: 0x888888 });
        const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        scene.add(asteroidMesh);

        const handleMouseMove = (event) => {
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let frameId;
        const clock = new THREE.Clock();
        
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const elapsed = clock.getElapsedTime();
            
            // Calculate visible width at z=0
            const vFov = (camera.fov * Math.PI) / 180;
            const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
            const visibleWidth = visibleHeight * camera.aspect;
            
            // Astronaut Animation (anchored to right edge)
            const astroBaseX = (visibleWidth / 2) - 0.5; 
            const astroBaseY = -1.5;
            astronautMesh.position.x += (astroBaseX + mouseRef.current.x * 0.8 - astronautMesh.position.x) * 0.02;
            astronautMesh.position.y += (astroBaseY + mouseRef.current.y * 0.5 + Math.sin(elapsed * 0.4) * 0.2 - astronautMesh.position.y) * 0.02;
            astronautMesh.rotation.z = Math.sin(elapsed * 0.3) * 0.05;

            // Asteroid Animation (anchored to left edge)
            const asteroidBaseX = -(visibleWidth / 2) + 0.5;
            const asteroidBaseY = 1.0;
            asteroidMesh.position.x += (asteroidBaseX + mouseRef.current.x * 0.5 - asteroidMesh.position.x) * 0.02;
            asteroidMesh.position.y += (asteroidBaseY + mouseRef.current.y * 0.3 + Math.cos(elapsed * 0.35) * 0.15 - asteroidMesh.position.y) * 0.02;
            asteroidMesh.rotation.z = Math.cos(elapsed * 0.15) * 0.03;

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container) container.removeChild(renderer.domElement);
            
            astronautGeometry.dispose();
            astronautMaterial.dispose();
            astronautTexture.dispose();
            
            asteroidGeometry.dispose();
            asteroidMaterial.dispose();
            asteroidTexture.dispose();
            
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="bg-layer bg-astronaut" aria-hidden="true" />;
}