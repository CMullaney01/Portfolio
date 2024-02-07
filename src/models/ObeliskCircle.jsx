import React from 'react';
import { Clone } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import obeliskScene from '../assets/3d/Obelisk.glb';

const ObeliskCircle = ({ center, radius, scale, rotation }) => {
    const { scene: obeliskGLTF } = useGLTF(obeliskScene);

    if (typeof radius !== 'number' || radius <= 0 || isNaN(radius)) {
        console.error('Invalid radius for ObeliskCircle:', radius);
        return null;
    }

    const numObelisks = 3;
    const obeliskComponents = [];

    // Calculate the angle between each obelisk
    const angleStep = (2 * Math.PI) / numObelisks;

    // Generate positions for each obelisk
    for (let i = 0; i < numObelisks; i++) {
        const angle = i * angleStep;
        const angleRadians = angle;
        const x = center[0] + radius * Math.cos(angleRadians);
        const z = center[2] + radius * Math.sin(angleRadians);
        console.log(`Obelisk ${i + 1} position: [${x}, 0, ${z}]`); // Log positions
        obeliskComponents.push(<Clone key={i} object={obeliskGLTF} position={[x, 0, z]} scale={scale} rotation={rotation} />);
    }

    return <>{obeliskComponents}</>;
};

export default ObeliskCircle;
