import React from 'react'
import './Loader.css'
import { Html } from '@react-three/drei'

const Loader = () => {
  return (
    <Html center>
        <div className="half-circle-spinner">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
    </Html>
  )
}

export default Loader;
