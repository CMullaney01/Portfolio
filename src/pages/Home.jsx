import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import { Island, Runner, StillRunner, CustomMarchingCubes, NightSky } from '../models'
import { Environment, Html } from '@react-three/drei'

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPanelView, setIsPanelView] = useState(false);

    const togglePanelView = () => {
        setIsPanelView(!isPanelView);
    };

    const adjustCameraForPanelView = () => {
        const defaultCameraSettings = {
            defaultPosition: [0, 0, 5],
            defaultRotation: [0, 0, 0],
            panelPosition: [1,1,1], // Adjust these values accordingly
            panelRotation: [0,0,0], // Adjust these values accordingly
        };

        if (isPanelView) {
            return { position: defaultCameraSettings.panelPosition, rotation: defaultCameraSettings.panelRotation };
        } else {
            return { position: defaultCameraSettings.defaultPosition, rotation: defaultCameraSettings.defaultRotation };
        }
    };

    const cameraSettings = adjustCameraForPanelView();
    

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -25.5, -43];
        let rotation = [0, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [1,1,1];
        } else {
            screenScale = [2,2,2];
        }
        return [screenScale, screenPosition, rotation]
    }
    // To be implemented after we have the basic functionality as we will need to rotate as well, do the same for plane
    const adjustRunnerForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [-0.6,-2.8,1];
        let rotation = [0.0, 1, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.0035,0.0035,0.0035];
        } else {
            screenScale = [0.0035,0.0035,0.0035];
        }
        return [screenScale, screenPosition, rotation]
    }

    const adjustObelisksForScreenSize = () => {
        let screenScale = null;
        let rotation = [0, 0.1, 0]
        let obeliskRadius = 7

        if (window.innerWidth < 768) {
            screenScale = [0.1,0.5,0.6];
        } else {
            screenScale = [0.1,0.5,0.6];
        }
        return [screenScale, rotation, obeliskRadius]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [runnerScale, runnerPosition, runnerRotation] = adjustRunnerForScreenSize();
    const [obeliskScale, obeliskRotation, obeliskRadius] = adjustObelisksForScreenSize();
   return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Canvas>
                <Suspense fallback={<Loader />}>
                    <Environment preset="night" background blur={0.5} />
                    <directionalLight position={[1, 1, 1]} intensity={2} color="#fffae6" />
                    <Runner isRotating={isRotating} position={runnerPosition} scale={runnerScale} rotation={runnerRotation} />
                    <StillRunner isRotating={isRotating} position={runnerPosition} scale={runnerScale} rotation={[0.0, 0.4, 0]} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                        obeliskRotation={obeliskRotation}
                        obeliskScale={obeliskScale}
                        obeliskRadius={obeliskRadius}
                    />
                </Suspense>
            </Canvas>
            {isPanelView && (
                <Html style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '5px' }}>
                        <button onClick={togglePanelView}>Close Panel</button>
                    </div>
                </Html>
            )}
        </div>
    );
};

export default Home;