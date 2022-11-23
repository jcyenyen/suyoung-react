import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import '../styles/landing.scss'


export default function App({ ready }) {
    return (
        <Canvas camera={{ position: [10, 8, 5]}}>
        <fog attach="fog" args={['#fcd50f', 0, 50]} />
        <Model ready={ready} />
        </Canvas>
    )
}

function Model({ ready }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/index_imgs/map.glb')
    useFrame(() => (group.current.rotation.y += 0.001))
    
    return (
        <>
            <group ref={group} scale={0.1} position={[-10, -10, 5]} dispose={null}>
                <group rotation={[-Math.PI / 20, 30, 0]}>
                <group position={[10, 10, 1]}>
                    <mesh material={materials.DefaultMaterial} geometry={nodes.Box011.geometry} />
                </group>
                <mesh position={[200000, -200000, 50000]}>
                    <sphereGeometry args={[30000, 32, 32]} />
                    <meshBasicMaterial color="#fcd50f" />
                </mesh>
                </group>
            </group>
        </>
    ) 
}