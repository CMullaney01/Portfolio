import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import { Island, ObeliskCircle, Runner, StillRunner } from '../models'
import { Environment } from '@react-three/drei'

const Home = () => {
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -25.5, -43];
        let rotation = [0.1, 4.7, 0]

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
        let screenPosition = [-0.5,-2.5,1];
        let rotation = [0.0, 1, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.005,0.005,0.005];
        } else {
            screenScale = [0.005,0.005,0.005];
        }
        return [screenScale, screenPosition, rotation]
    }

    const adjustObelisksForScreenSize = () => {
        let screenScale = null;
        let rotation = [0.0, 1, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.03,0.1,0.1];
        } else {
            screenScale = [0.03,0.1,0.1];
        }
        return [screenScale, rotation]
    }

    const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
    const [runnerScale, runnerPosition, runnerRotation] = adjustRunnerForScreenSize();
    const [obeliskScale, obeliskRotation] = adjustObelisksForScreenSize();
    return (
        <section className='w-full h-screen relative'>
            {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>POPUP</div> */}
            <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{near: 0.1, far: 1000}}>
                <Suspense fallback={<Loader />}>
                    {/* Can change this environment in the future */}
                    {/* <spotLight position={[10,10,10]} castShadow={true} angle={0}/> Fiddle with the spotlight as it is likely somethiogyou would like */}
                    {/* Add multiple obelisks */}
                    <Environment preset="night" background blur={0.5} />
                    <directionalLight position={[1,1,1]} intensity={2} />
                    <ObeliskCircle center={islandPosition} scale={obeliskScale} rotation={obeliskRotation} radius={4}/>
                    <Runner isRotating={isRotating} position={runnerPosition} scale={runnerScale} rotation={runnerRotation}/>
                    <StillRunner isRotating={isRotating} position={runnerPosition} scale={runnerScale} rotation={[0.0, 0.4, 0]}/>
                    <Island position={islandPosition} scale={islandScale} rotation={islandRotation} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentStage}/>
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Home