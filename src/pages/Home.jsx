import React, { useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Loader from '../components/Loader'
import { Island, Runner, StillRunner, CustomMarchingCubes, NightSky } from '../models'
import { Environment } from '@react-three/drei'

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPanelView, setIsPanelView] = useState(false);
    const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);

    const togglePanelView = () => {
        setIsPanelView(prevState => !prevState);
    };

    // Update camera position when isRotating changes
    useEffect(() => {
        // Check if rotating, then exit the close-up view
        if (isRotating) {
            setIsPanelView(false);
        }
        // Update camera settings based on panel view state
        if (!isPanelView) {
            setCameraPosition([0, 0, 5]); // Default position
        } else {
            setCameraPosition([0, -10, -10]); // Panel position
        }
    }, [isRotating, isPanelView]);

    // Define the CameraRig component
    function CameraRig({ position: [x, y, z] }) {
        useFrame((state) => {
            state.camera.position.lerp({ x, y, z }, 0.1)
        })
    }

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
        <section className='w-full h-screen relative'>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}>
                <CameraRig position={cameraPosition} />
                <Suspense fallback={<Loader />}>
          <Environment preset="night" background blur={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={2} color="#fffae6" />
          <Runner isRotating={isRotating} position={[-0.6, -2.8, 1]} scale={[0.0035, 0.0035, 0.0035]} rotation={[0.0, 1, 0]} />
          <StillRunner isRotating={isRotating} position={[-0.6, -2.8, 1]} scale={[0.0035, 0.0035, 0.0035]} rotation={[0.0, 0.4, 0]} />
          <Island position={[0, -25.5, -43]} scale={[2, 2, 2]} rotation={[0, 4.7, 0]} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage} obeliskRotation={[0, 0.1, 0]} obeliskScale={[0.1, 0.5, 0.6]} obeliskRadius={7} />
        </Suspense>
      </Canvas>
      {/* Conditional rendering of "Swipe or press Down to move" */}
      {!isRotating && !isPanelView && (
                <div
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        color: '#ffffff',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    Swipe or press Down to move
                </div>
            )}
            {/* Button for toggling panel view */}
            <button
                onClick={togglePanelView}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                Toggle Panel View
            </button>
        </section>
  )
}

export default Home;