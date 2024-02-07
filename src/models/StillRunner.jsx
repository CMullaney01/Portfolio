import React from 'react';
import { useGLTF } from '@react-three/drei';

import stillRunnerScene from '../assets/3d/Robot-Still_Scaled.glb';

const StillRunner = ({ isRotating }) => {
  // Render null if isRotating is true
  if (isRotating) {
    return null;
  }

  const { scene } = useGLTF(stillRunnerScene);

  // Render the still runner without any animations
  return (
    <mesh position={[-1, -1, -1]} scale={[0.005, 0.005, 0.005]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default StillRunner;
