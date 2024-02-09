import React, { useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Loader from '../components/Loader'
import { Island, Runner, StillRunner} from '../models'
import { Environment } from '@react-three/drei'

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [finishedRotating, setFinishedRotating] = useState(true);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPanelView, setIsPanelView] = useState(false);
    const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);

    const togglePanelView = () => {
        setIsPanelView(prevState => !prevState);
    };

    // Update camera position when isRotating changes
    useEffect(() => {
        // Check if rotating, then exit the close-up view
        // if (isRotating) {
        //     setIsPanelView(false);
        // }
        // Update camera settings based on panel view state
        if (!isPanelView) {
            setCameraPosition([-0, 0, 5]); // Default position
        } else {
            if (window.innerWidth < 768) {
                setCameraPosition([-0.3, -9, -7])
            } else {
                setCameraPosition([-0, -9, -10]); // Panel position
            }
        }
    }, [isRotating, isPanelView]);

    // Define the CameraRig component
    function CameraRig({ position: [x, y, z] }) {
        useFrame((state) => {
            state.camera.position.lerp({ x, y, z }, 0.1)
            state.camera.rotation.y = -0.02
            state.camera.rotation.x = -0.02
        })
    }

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -20, -43];
        let rotation = [0, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.3,0.3,0.3];
        } else {
            screenScale = [0.3,0.3,0.3];
        }
        return [screenScale, screenPosition, rotation]
    }
    // To be implemented after we have the basic functionality as we will need to rotate as well, do the same for plane
    const adjustRunnerForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [-9,-16,-20];
        let rotation = [0.0, 1, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.035,0.035,0.035];
        } else {
            screenScale = [0.035,0.035,0.035];
        }
        return [screenScale, screenPosition, rotation]
    }

    const adjustObelisksForScreenSize = () => {
        let screenScale = null;
        let rotation = [0, 0.1, 0]
        let obeliskRadius = 60


        if (window.innerWidth < 768) {
            screenScale = [0.2,5,4.5];
        } else {
            screenScale = [0.2,5,5];
        }
        return [screenScale, rotation, obeliskRadius]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [runnerScale, runnerPosition, runnerRotation] = adjustRunnerForScreenSize();
    const [obeliskScale, obeliskRotation, obeliskRadius] = adjustObelisksForScreenSize();
    return (
        <section className='w-full h-screen relative'>
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}` } style={{ touchAction: 'none' }}>
                <CameraRig position={cameraPosition} />
                <Suspense fallback={<Loader />}>
                    <Environment preset="dawn" background blur={0.5} />
                    <directionalLight position={[1, 1, 1]} intensity={2} color="#fffae6" />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#000022" groundColor="#000000" intensity={1}/>
                    <Runner isRotating={isRotating} position={runnerPosition} scale={runnerScale} rotation={[0.0, 1, 0]} />
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
                        isPanelView={isPanelView}
                        setIsPanelView={setIsPanelView}
                        finishedRotating={finishedRotating}
                        setFinishedRotating={setFinishedRotating}
                    />
                </Suspense>
            </Canvas>
      {/* Conditional rendering of "Swipe or press Down to move" */}
      {!isRotating && !isPanelView && (
                <div
                    
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    Swipe or press Arrow to move
                </div>
            )}
            {/* Button for toggling panel view */}
           {finishedRotating &&
            ( <button
                onClick={togglePanelView}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    transform: 'translateX(50%)',
                    zIndex: 1000,

                }}
            >
                Toggle Panel View
            </button>)}
            {finishedRotating &&  isPanelView && (
                <div
                    
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        verticalAlign: 'middle',
                        textAlign: 'center',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    Keep Swiping!
                </div>
            )}
        </section>
  )
}

export default Home;