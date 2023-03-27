import * as THREE from 'three'
import { useMemo } from 'react'
import WebGL from '@/app/global'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing'

export default function Scene() {
  return (
    <>
      <Canvas
        style={{ position: 'fixed' }}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], far: 20 }}
      >
        <WebGL />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            height={300}
          />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
      <Canvas
        style={{ position: 'fixed', zIndex: -30 }}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], far: 20 }}
      >
        <Background />
        <Sparkles
          size={Math.random() * 1.5 + 0.5}
          opacity={1}
          noise={3}
          random
          color={'#00EE2A'}
          count={1500}
          scale={20}
        />
      </Canvas>
    </>
  )
}

function Background() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: [window.innerWidth, window.innerHeight] },
      uColorA: { value: new THREE.Color('#3BD857') },
      uColorB: { value: new THREE.Color('#232323') },
    }),
    []
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <>
      <points position={[0, -7, -2]} rotation={[Math.PI / 1.7, 0, Math.PI / 4]}>
        <planeGeometry args={[100, 100, 160, 160]} />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          vertexShader={vertexPoints}
          fragmentShader={fragmentPoints}
          transparent={true}
          depthTest={true}
          side={THREE.DoubleSide}
        />
      </points>
    </>
  )
}

const vertexPoints = `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        vUv = uv;
        vPosition = position;
        
        vPosition.x += sin(uTime + position.y * 30.0) * 1.;
        vPosition.z += sin(uTime + position.x * 30.0) * 2.;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
        gl_PointSize = 2.0;
    }
`
const fragmentPoints = `
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
        // make points with a distance to the center of the screen
        // smaller than 0.5 opaque
        float dist = distance(vUv, vec2(0.5));
        if (dist > 0.8) {
            discard;
        }
        
        vec3 color = mix(uColorA, uColorB, vUv.y);
        
        // make points with a distance to the center of the screen
        // smaller than 0.3 opaque
        if (dist < 0.6) {
            gl_FragColor = vec4(color, smoothstep(0.05, 0.6, dist));
        }
        
        // gl_FragColor = vec4(uColorA, 0.4);
    }
`
