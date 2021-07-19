import React from 'react'
import { Canvas } from 'react-three-fiber'
import  Box from '../Box'

function Header() {
  return (
    <>
    <Canvas camera={{position: [-10,10,10], fov: 35}} className="canvas">
      <ambientLight />
      <pointLight position={[-10,10,-10]} castShadow />
      {[-3,0,3].map((x) =>
        [-3,0,3].map((z) => <Box position={[x,0,z]} />)
      )}
    </Canvas>
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      TuneVibes
    </a>
    <Canvas camera={{position: [-10,10,10], fov: 35}} className="canvas">
      <ambientLight />
      <pointLight position={[10,10,10]} castShadow />
      {[-3,0,3].map((x) =>
        [-3,0,3].map((z) => <Box position={[x,0,z]} />)
      )}
    </Canvas>
    </>
  )
}
export default Header