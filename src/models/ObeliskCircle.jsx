import React, { useEffect, useState } from 'react';
import { Clone, useGLTF, Text, Html } from '@react-three/drei';
import obeliskScene from '../assets/3d/Obelisk.glb';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';

const ObeliskCircle = ({ center, radius, scale, initialRotation, isPanelView, finishedRotating }) => {
    const { scene: obeliskGLTF } = useGLTF(obeliskScene);
    const [rotation, setRotation] = useState(initialRotation);
    const [obeliskOpacity, setObeliskOpacity] = useState(isPanelView ? 1: 0.1);
    
    if (typeof radius !== 'number' || radius <= 0 || isNaN(radius)) {
        console.error('Invalid radius for ObeliskCircle:', radius);
        return null;
    }

    const numObelisks = 3;
    const obeliskComponents = [];
    const closedComponents = [];
    const openComponents = [];
    const opacityLerpSpeed = 0.03; // Adjust the lerp speed as needed

    // Calculate the angle between each obelisk
    const angleStep = (2 * Math.PI) / numObelisks;

    useEffect(() => {
        // Update rotation when initialRotation changes
        setRotation(initialRotation);
    
        // Make the material of the loaded GLTF model transparent and glass-like
        obeliskGLTF.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = isPanelView ? 0.8 : 0.2;
                child.material.reflectivity = 1; // Set the reflectivity to make it look like glass
                child.material.refractionRatio = 0.98; // Set the refraction ratio for glass-like effect
                child.material.envMapIntensity = 1; // Set environment map intensity
        
                // Adjust the color, roughness, and metalness for a better glass effect
                child.material.color = new THREE.Color(1, 1, 1); // Set color to white (optional)
                child.material.roughness = 0.1; // Adjust roughness for smoothness (optional)
                child.material.metalness = 0.9; // Adjust metalness for reflectivity (optional)
            }
        });
    }, [initialRotation, obeliskGLTF]);
    // Use the useFrame hook to update opacity smoothly
    useFrame(() => {
        const targetOpacity = isPanelView ? 1 : 0.1;

        // Smoothly adjust opacity using linear interpolation
        setObeliskOpacity((prevOpacity) => THREE.MathUtils.lerp(prevOpacity, targetOpacity, opacityLerpSpeed));
        // Update the opacity of each obelisk
        obeliskGLTF.traverse((child) => {
            if (child.isMesh) {
                child.material.opacity = obeliskOpacity;
            }
        });
    });

    // Calculate the initial rotation angle of the first obelisk
    const initialRotationY = Math.atan2(rotation[2], rotation[0]);

    // Generate positions and rotations for each obelisk
    for (let i = 0; i < numObelisks; i++) {
        const angle = i * angleStep;

        // Calculate the position of the obelisk
        const x = center[0] + radius * Math.cos(angle);
        const z = center[2] + radius * Math.sin(angle) + 43;

        // Calculate the position for the text component (an amount further away from the center)
        const textOffset = 2; // Adjust the offset as needed
        const textX = x + textOffset * Math.cos(angle);
        const textZ = z + textOffset * Math.sin(angle);

        // Calculate the rotation for the current obelisk
        const rotationY = initialRotationY - angle;

        obeliskComponents.push(
            <group key={i}>
                <Clone object={obeliskGLTF} position={[x, 2, z]} scale={scale} rotation={[0, rotationY, 0]}>
                    
                </Clone>
            </group>
        );
        const texts = ["Skills", "Projects", "Contact Me"];
        const paragraphs = [
            "I'm enthusiastic about technology and love diving into new challenges. With experience in C++, Golang, React web development, and IoT, I'm always eager to expand my skills. Let's explore how my expertise can bring value to your projects!",
            "I've worked on a diverse range of projects, spanning from IoT and React development to machine learning, AI, and even Blender creations. Feel free to explore my portfolio to see some of these exciting projects in action!",
            "If you have any questions or inquiries, I'm here to help! Feel free to reach out to me via email, and I'll be more than happy to discuss any opportunities or concerns you may have. Looking forward to hearing from you!"
        ];
        const pages = ["About", "Projects", "Contact"]
        const pagerefs = ["/about", "/projects", "/contact"]
        // Add text components
        closedComponents.push(
            <Html key={i} scale={1} rotation={[0, rotationY + Math.PI / 2, 0]} position={[textX, 12 * scale[1], textZ]} transform occlude>
                <div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)', // More frosted glass effect
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        border: 'none',
                        color: 'rgb(25, 25, 112)',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '10em',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {texts[i]}
                </div>
            </Html>
        );

        openComponents.push(
        <Html
            key={i}
            scale={1}
            rotation={[0, rotationY + Math.PI / 2, 0]}
            position={[textX, 8 * scale[1], textZ]}
            transform
            occlude
            fullscreen
            style={{
                width: "1500px",
                height: "2100px",
                // backgroundColor: "#454545",
                display: "grid",
                placeContent: "center"
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // More frosted glass effect
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    padding: '10px 30px',
                    borderRadius: '50px',
                    // border: '10px solid #FFA500', // Border around the first div
                    color: 'rgb(25, 25, 112)',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    fontSize: '10em',
                    whiteSpace: 'nowrap'
                }}
            >
                {texts[i]}
            </div>
            
            <div
                style={{
                    position: 'absolute',
                    top: '55%', // Adjusted top position to appear below the first div
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '1500px', // Set width to 100 pixels
                    height: '1100px', // Set height to 100 pixels
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // More frosted glass effect
                    textAlign: 'center',
                    padding: '20px', // Adjusted padding for a narrower div
                    borderRadius: '60px',
                    // border: '10px solid #FFA500', // Border around the second div
                    color: 'rgb(25, 25, 112)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    lineHeight: '1.5',
                }}
            >
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                <p style={{ margin: '20px 0 0', fontSize: '4em' }}>{paragraphs[i]}</p>
                <p style={{ margin: '250px 0 0', fontSize: '4em' }}>Please check out the <a href={pagerefs[i]} style={{ color: 'rgb(25, 25, 112)', textDecoration: 'underline' }}>{pages[i]} page</a> if you would like to learn more.</p>
            </div>
            {/* <iframe style={{ margin: '2000px 0 0'}} src={pagerefs[i]} width="1400" height="600"></iframe> */}
        </Html>
        );
    }

    return (
        <>
            {/* Render the obelisk components */}
            {obeliskComponents}
            {/* Render the text components */}
            {isPanelView ? openComponents : closedComponents}
        </>
    );
};

export default ObeliskCircle;
