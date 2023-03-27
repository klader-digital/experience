import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useControls } from 'leva'
import { Numbers } from '@/components/numbers'
import { Chip } from '@/components/chip'

export default function WebGL() {
  const group = useRef()
  const mouse = useMemo(() => new THREE.Vector2(), [])
  const { height } = useThree((state) => state.viewport)

  useControls({
    progress: {
      value: 0,
      min: 0,
      max: 1.5,
      onChange: (value) => (uniforms.uProgress.value = value),
    },
    colorA: {
      value: '#00ff40',
      onChange: (value) => (uniforms.uColorA.value = new THREE.Color(value)),
    },
    colorB: {
      value: '#6cff00',
      onChange: (value) => (uniforms.uColorB.value = new THREE.Color(value)),
    },
    colorC: {
      value: '#003e0c',
      onChange: (value) => (uniforms.uColorC.value = new THREE.Color(value)),
    },
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color('#3BD857') },
      uColorB: { value: new THREE.Color('#e5e5e5') },
      uColorC: { value: new THREE.Color('#6bc87e') },
    }),
    []
  )

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()

    const models = [Numbers(), Chip()]

    const count = models.reduce((acc, model) => {
      return model.count > acc ? model.count : acc
    }, 0)

    const positions = new Float32Array(count * 3)
    const numbers = new Float32Array(count * 3)
    const sphere = new Float32Array(count * 3)
    const random = new Float32Array(count * 1)

    const sphereCount = 2000
    const modSphereNumber = Math.floor(count / sphereCount)

    for (let i = 0; i < count; i++) {
      if (i % modSphereNumber === 0) {
        const theta = Math.random() * 2 * Math.PI
        const phi = Math.acos(2 * Math.random() - 1)
        const radius = Math.random() * 0.02 + 0.5

        sphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        sphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        sphere[i * 3 + 2] = radius * Math.cos(phi)
      } else {
        // math random between -30, -20 and 20, 30
        sphere[i * 3] = (Math.random() - 0.5) * 20
        sphere[i * 3 + 1] = (Math.random() - 0.5) * 20
        sphere[i * 3 + 2] = (Math.random() - 0.5) * 20
      }

      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      numbers[i * 3] = models[0].array[i * 3]
      numbers[i * 3 + 1] = models[0].array[i * 3 + 1]
      numbers[i * 3 + 2] = models[0].array[i * 3 + 2]

      random[i] = Math.random()
    }

    // const sphere = new Float32Array(count * 3)
    // const random = new Float32Array(count)

    // for (let i = 0; i < count * 3; i++) {
    //   positions[i] = (Math.random() - 0.5) * 20
    //   // place each particle at a random position on the outside of the sphere with radius 1
    //   const theta = Math.random() * 2 * Math.PI
    //   const phi = Math.acos(2 * Math.random() - 1)
    //   const radius = Math.random() * 0.02 + 0.5
    //
    //   sphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    //   sphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    //   sphere[i * 3 + 2] = radius * Math.cos(phi)
    //
    // }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('numbers', new THREE.BufferAttribute(numbers, 3))
    geometry.setAttribute('sphere', new THREE.BufferAttribute(sphere, 3))
    geometry.setAttribute('random', new THREE.BufferAttribute(random, 1))

    return geometry
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({
      paused: true,
    })

    gsap.to(uniforms.uProgress, {
      value: 1,
      ease: 'power4.out',
      duration: 2.4,
      invalidateOnRefresh: true,
    })

    gsap.to(group.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      ease: 'power4.out',
      duration: 2.4,
      invalidateOnRefresh: true,
    })

    tl.to(uniforms.uProgress, {
      value: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#introduction',
        start: 'top top',
        end: '+=100% center',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(group.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#introduction',
        start: 'top top',
        end: '+=100% center',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / innerWidth) * 2 - 1
      mouse.y = -(event.clientY / innerHeight) * 2 + 1
    })

    return () => {
      window.removeEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = -(event.clientY / innerHeight) * 2 + 1
      })
    }
  }, [geometry, uniforms, height, mouse])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    // rotate based on mouse position
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.1,
      0.05
    )
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.1,
      0.05
    )
  })

  return (
    <group ref={group} scale={3}>
      <points>
        <bufferGeometry attach="geometry" {...geometry} />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent={true}
          depthTest={true}
        />
      </points>
    </group>
  )
}

const vertex = `
    attribute vec3 numbers;
    attribute vec3 sphere;
    attribute vec3 chip;
    attribute float random;
        
    uniform float uProgress;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    
    varying vec3 vPosition;
    varying vec3 vPos;
    varying float vRandom;
    
    void main() {
        vPosition = position;
        vRandom = random;
        vec3 pos = position;
              
        // transition between 5 models based on every round number of uProgress
        float t = mod(uProgress, 1.0);
        if (uProgress < 1.0) {
            pos = mix(position, numbers, t);
        } else if (uProgress < 2.0) {
            pos = mix(numbers, sphere, t);
        } else {
            pos = sphere;
        }
        
        vPos = pos;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = random * 4.;
    }
`

const fragment = `
    uniform float uProgress;
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform sampler2D uMap;

    varying vec3 vPosition;
    varying vec3 vPos;
    varying float vRandom;
   
    void main() {
        vec3 color = vec3(0.0);    
       
        if (vRandom < 0.33) {
            color = uColorA;
        } else if (vRandom < 0.66) {
            color = uColorB;
        } else {
            color = uColorC;
        }
        
        
        // make the point a circular shape
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) {
            discard;
        }
        
        
        float alpha = smoothstep(0.0, 1.0, abs(sin(vRandom * 100. + uTime * 2.)));
        
        // when progress is between 1 and 2, and distance from center is more than 0.5, make the point transparent
        // if (smoothstep(1.75, 2.0, uProgress) > 0.0 && length(vPos) > 1.) {
        //     alpha = 1. - uProgress;
        // }
        
        // alpha = 0. when progress is between 1 and 2, and distance from center is more than 0.5
        if (smoothstep(1.0, 2.0, uProgress) > 0.0 && length(vPos) > 3.) {
            alpha = smoothstep(.2,  .0, uProgress);
        }
       
        
        
        gl_FragColor = vec4(color, alpha);
    }
`
