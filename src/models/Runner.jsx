import React, { useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

import runnerScene from '../assets/3d/robot_runner.glb';

const Runner = ({ isRotating, ...props}) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(runnerScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {    
    if (isRotating && actions['Take 001']) {
      actions['Take 001'].play();
    } else if (actions['Take 001']) {
      actions['Take 001'].stop();
    }
  }, [isRotating, actions]);

  if (!animations || !actions) {
    return null; // Return null if animations or actions are not available
  }

  // Render the component only if isRotating is true
  return isRotating ? (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  ) : null;
};

export default Runner;
