import React, { useState, useEffect, useRef } from 'react' 
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

const Box = ({ position }) => {
    const [ active, setActive ] = useState(0)
    const activeRef = useRef(active)
    activeRef.current = active

    useEffect(() => {
        let timeout
        const toggleActive = () =>{
            timeout = setTimeout(() =>{
                setActive(Number(!activeRef.current))
                toggleActive()
            }, Math.random() * 2000 + 1000)
        }
        toggleActive()
        return () =>{
            clearTimeout(timeout)
        }
    },[])

    const { spring } = useSpring({
        spring: active,
        config:{ mass: 20, tension: 200, friction:50, precision: 0.0001 }
    })
    const size = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3]
    //const colors = ["#2A3345","#5A98B6","#00FFFF","#099FFF","#0062FF","#0033FF","#9D00FF","#CC00FF","#6E0DD0","#9900FF"]
    const scale = spring.to([0,1], [1, size[Math.floor(Math.random()*size.length)]])
    const rotation = spring.to([0,1], [0, Math.PI])
    const color = spring.to([0,1],["#255784","#2196f3"])

    return (
        <a.mesh
            rotation-y={rotation}
            scale-x={scale}
            scale-y={scale}
            scale-z={scale}
            position={position}
        >
            <boxBufferGeometry attach='geometry' arg={[1,1,1]} />
            <a.meshStandardMaterial roughness={0.1} attach='material' color={color} />
        </a.mesh>    

    )

}

export default Box;


