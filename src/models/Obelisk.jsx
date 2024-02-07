import React from 'react'

import obeliskScene from '../assets/3d/Obelisk.glb'
import { useGLTF } from '@react-three/drei'

const Obelisk = () => {
  const { scene, animations } = useGLTF(obeliskScene)
  return (
    <mesh position={[-2,-3,-2]} scale={[0.03,0.1,0.1]}>
      <primitive object={scene} />
    </mesh>
    
  )
}

export default Obelisk