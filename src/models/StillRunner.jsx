import React from 'react';
import { useGLTF } from '@react-three/drei';

import stillRunnerScene from '../assets/3d/Robot-Still_Scaled.glb';

const StillRunner = ({ isRotating, ...props }) => {
  // Render null if isRotating is true
  if (isRotating) {
    return null;
  }

  const { scene } = useGLTF(stillRunnerScene);

  // Render the still runner without any animations
  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default StillRunner;
