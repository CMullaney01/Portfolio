import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial();

const geometries = [
  { geometry: new THREE.TetrahedronGeometry(2) },
  { geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32) },
  { geometry: new THREE.ConeGeometry(1.1, 1.7, 32) },
  { geometry: new THREE.IcosahedronGeometry(2) },
  { geometry: new THREE.TorusGeometry(1.1, 0.35, 16, 32) },
  { geometry: new THREE.OctahedronGeometry(2) },
  { geometry: new THREE.BoxGeometry(2.5, 2.5, 2.5) }
];

const getRandomGeometry = () => {
  const randomIndex = Math.floor(Math.random() * geometries.length);
  return geometries[randomIndex].geometry;
};

const Star = ({ position, color }) => {
    const starRef = useRef();

    useFrame(() => {
        starRef.current.rotation.y += 0.009;
        starRef.current.rotation.x += 0.003;
        starRef.current.rotation.z += 0.005;
    });

    return (
        <mesh ref={starRef} position={position}>
            <primitive object={getRandomGeometry()} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

const useStars = (numStars) => {
    const stars = useRef([]);

    useEffect(() => {
        for (let i = 0; i < numStars; i++) {
            // Random positions within a smaller range to reduce height and spread
            const x = Math.random() * 300 - 150; // Random x position within range [-150, 150]
            const y = Math.random() * 100 + 50; // Random y position within range [50, 100] (lower height)
            const z = Math.random() * 300 - 150; // Random z position within range [-150, 150]
            const color = new THREE.Color(0xffffff); // White color for now, can be adjusted

            stars.current.push({ key: i, position: [x, y, z], color });
        }
    }, [numStars]);

    return stars.current;
};

const NightSky = ({ numStars }) => {
    const stars = useStars(numStars);

    return (
        <>
            {stars.map(star => (
                <Star key={star.key} position={star.position} color={star.color} />
            ))}
        </>
    );
};

export { Star, NightSky };
