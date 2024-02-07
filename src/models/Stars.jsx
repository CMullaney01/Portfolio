import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Star = ({ position, color }) => {
    const starRef = useRef();

    useFrame(() => {
        starRef.current.rotation.y += 0.001;
    });

    return (
        <mesh ref={starRef} position={position}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={color} />
        </mesh>
    );
};

const NightSky = () => {
    const numStars = 200;
    const stars = [];

    // Generate random positions and colors for the stars
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * 40 - 20; // Random x position within range [-20, 20]
        const y = Math.random() * 20 + 10; // Random y position within range [10, 30] (higher up)
        const z = Math.random() * 40 - 20; // Random z position within range [-20, 20]
        const color = new THREE.Color(0xffffff); // White color for now, can be adjusted

        stars.push(<Star key={i} position={[x, y, z]} color={color} />);
    }

    return <>{stars}</>;
};

export { Star, NightSky };
