import React from 'react';
import { MarchingCubes, MarchingCube, MarchingPlane } from '@react-three/drei';
import { Color } from 'three';

const CustomMarchingCubes = () => {
    return (
        <MarchingCubes resolution={50} maxPolyCount={20000} enableUvs={false} enableColors={true}>
            <MarchingCube strength={0.5} subtract={12} color={new Color('#f0f')} position={[0.5, 0.5, 0.5]} />
            <MarchingPlane planeType="y" strength={0.5} subtract={12} />
        </MarchingCubes>
    );
};

export default CustomMarchingCubes;