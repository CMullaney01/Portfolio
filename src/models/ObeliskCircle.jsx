import React, { useEffect, useState } from 'react';
import { Clone, useGLTF, Text } from '@react-three/drei';
import obeliskScene from '../assets/3d/Obelisk.glb';
import * as THREE from 'three'

const ObeliskCircle = ({ center, radius, scale, initialRotation }) => {
    const { scene: obeliskGLTF } = useGLTF(obeliskScene);
    const [rotation, setRotation] = useState(initialRotation);

    if (typeof radius !== 'number' || radius <= 0 || isNaN(radius)) {
        console.error('Invalid radius for ObeliskCircle:', radius);
        return null;
    }

    const numObelisks = 3;
    const obeliskComponents = [];
    const textComponents = [];

    // Calculate the angle between each obelisk
    const angleStep = (2 * Math.PI) / numObelisks;

    useEffect(() => {
        // Update rotation when initialRotation changes
        setRotation(initialRotation);
    
        // Make the material of the loaded GLTF model transparent and glass-like
        obeliskGLTF.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0.5; // Set the opacity value here
                child.material.reflectivity = 1; // Set the reflectivity to make it look like glass
                child.material.refractionRatio = 0.98; // Set the refraction ratio for glass-like effect
                child.material.envMapIntensity = 1; // Set environment map intensity
                // Optionally, you can set other properties like color, roughness, etc. for a better glass effect
                child.material.color = new THREE.Color(1, 1, 1); // Set color to white (optional)
                child.material.roughness = 0.1; // Set roughness (optional)
                child.material.metalness = 0.9; // Set metalness (optional)
            }
        });
    }, [initialRotation, obeliskGLTF]);

    // Calculate the initial rotation angle of the first obelisk
    const initialRotationY = Math.atan2(rotation[2], rotation[0]);

    // Generate positions and rotations for each obelisk
    for (let i = 0; i < numObelisks; i++) {
        const angle = i * angleStep;

        // Calculate the position of the obelisk
        const x = center[0] + radius * Math.cos(angle);
        const z = center[2] + radius * Math.sin(angle) + 43;

        // Calculate the position for the text component (an amount further away from the center)
        const textOffset = 0.1; // Adjust the offset as needed
        const textX = x + textOffset * Math.cos(angle);
        const textZ = z + textOffset * Math.sin(angle);

        // Calculate the rotation for the current obelisk
        const rotationY = initialRotationY - angle;

        obeliskComponents.push(
            <group key={i}>
                <Clone object={obeliskGLTF} position={[x, 2, z]} scale={scale} rotation={[0, rotationY, 0]} />
            </group>
        );

        // Add text components
        textComponents.push(
            <Text
                key={i}
                scale={[0.5, 0.5, 0.5]} // Adjust the scale to make the text smaller
                color="black"
                anchorX="center"
                anchorY="bottom"
                position={[textX, 15 * scale[1], textZ]} // Adjust the y position to sit slightly above the obelisks
                rotation={[0, rotationY + Math.PI / 2, 0]} // Reverse rotation and add Math.PI to align properly
            >
                Your Text
            </Text>
        );
    }

    return (
        <>
            {/* Render the obelisk components */}
            {obeliskComponents}
            {/* Render the text components */}
            {textComponents}
        </>
    );
};

export default ObeliskCircle;
