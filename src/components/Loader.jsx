import React from 'react'
import './Loader.css'
import { Html } from '@react-three/drei'

const Loader = () => {
  return (
    <Html center>
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
    </Html>
  )
}

export default Loader;
