import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useControls } from 'leva'
import { Numbers } from '@/components/numbers'
import { Chip } from '@/components/chip'
import { useLenis } from '@studio-freight/react-lenis'

function setSphere(size) {
  const theta = Math.random() * 2 * Math.PI
  const phi = Math.acos(2 * Math.random() - 1)
  const radius = Math.random() * 0.02 + size

  return [radius, theta, phi]
}

export default function WebGL() {
  const group = useRef()
  const mouse = useMemo(() => new THREE.Vector2(), [])
  const { height } = useThree((state) => state.viewport)
  const lenis = useLenis(undefined, undefined, undefined)

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
    const molecule = new Float32Array(count * 3)
    const random = new Float32Array(count * 1)

    const sphereCount = 800
    const modSphereNumber = Math.floor(count / sphereCount)

    const moleculeCount = 1000
    const modMoleculeNumber = Math.floor(count / moleculeCount)

    for (let i = 0; i < count; i++) {
      if (i % modSphereNumber === 0) {
        let [radius, phi, theta] = setSphere(0.5)
        sphere[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
        sphere[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        sphere[i * 3 + 2] = radius * Math.cos(phi)
      } else {
        // math random between -30, -20 and 20, 30
        sphere[i * 3] = (Math.random() - 0.5) * 20
        sphere[i * 3 + 1] = (Math.random() - 0.5) * 20
        sphere[i * 3 + 2] = (Math.random() - 0.5) * 20
      }

      if (i % modMoleculeNumber === 0) {
        // add three spheres to molecule
        let small = setSphere(0.1)
        molecule[i * 3] =
          small.radius * Math.sin(small.phi) * Math.cos(small.theta)
        molecule[i * 3 + 1] =
          small.radius * Math.sin(small.phi) * Math.sin(small.theta)
        molecule[i * 3 + 2] = small.radius * Math.cos(small.phi)

        let medium = setSphere(0.4)
        molecule[i * 3 + 3] =
          medium.radius * Math.sin(medium.phi) * Math.cos(medium.theta)
        molecule[i * 3 + 4] =
          medium.radius * Math.sin(medium.phi) * Math.sin(medium.theta)
        molecule[i * 3 + 5] = medium.radius * Math.cos(medium.phi)

        let large = setSphere(0.8)
        molecule[i * 3 + 6] =
          large.radius * Math.sin(large.phi) * Math.cos(large.theta)
        molecule[i * 3 + 7] =
          large.radius * Math.sin(large.phi) * Math.sin(large.theta)
        molecule[i * 3 + 8] = large.radius * Math.cos(large.phi)
      } else {
        // math random between -30, -20 and 20, 30
        molecule[i * 3] = (Math.random() - 0.5) * 20
        molecule[i * 3 + 1] = (Math.random() - 0.5) * 20
        molecule[i * 3 + 2] = (Math.random() - 0.5) * 20
      }

      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      numbers[i * 3] = models[0].array[i * 3]
      numbers[i * 3 + 1] = models[0].array[i * 3 + 1]
      numbers[i * 3 + 2] = models[0].array[i * 3 + 2]

      random[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('numbers', new THREE.BufferAttribute(numbers, 3))
    geometry.setAttribute('sphere', new THREE.BufferAttribute(sphere, 3))
    geometry.setAttribute('molecule', new THREE.BufferAttribute(molecule, 3))
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
      duration: 3.2,
      onComplete: () => {
        uniforms.uProgress.value = 1
      },
    })

    gsap.to(group.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      ease: 'power4.out',
      duration: 2.4,
      onComplete: () => {
        lenis.start()
      },
    })

    tl.to(uniforms.uProgress, {
      value: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#journey',
        start: 'top top',
        end: '+=100% top',
        invalidateOnRefresh: true,
        scrub: 0.5,
      },
    })
      .to(group.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#journey',
          start: 'top top',
          end: '+=100% top',
          invalidateOnRefresh: true,
          scrub: 0.5,
        },
      })
      .to(group.current.position, {
        y: height,
        ease: 'none',
        scrollTrigger: {
          trigger: '#introduction',
          start: 'top top',
          end: '+=100% top',
          invalidateOnRefresh: true,
          scrub: true,
        },
      })
      .to(
        group.current.scale,
        {
          scrollTrigger: {
            trigger: '#video',
            start: 'top top',
            end: '+=150% top',
            scrub: true,
            invalidateOnRefresh: true,
            onEnterBack: () => {
              group.current.position.y = height
            },
          },
          onComplete: () => {
            group.current.position.y = 0
          },
        },
        0
      )
      .to(uniforms.uProgress, {
        value: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: '#solutions',
          start: 'top top',
          end: '+=100% top',
          invalidateOnRefresh: true,
          scrub: 0.5,
        },
      })
      .to(group.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#solutions',
          start: 'top top',
          end: '+=100% top',
          invalidateOnRefresh: true,
          scrub: 0.5,
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
  }, [geometry, uniforms, height, mouse, lenis])

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
    attribute vec3 molecule;
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
        } else if (uProgress < 3.0) {
            pos = mix(sphere, molecule, t);
        } else {
            pos = molecule;
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
