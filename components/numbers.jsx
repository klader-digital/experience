/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/numbers.glb --transform
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Numbers() {
  const { nodes } = useGLTF('/models/numbers-transformed.glb')
  return nodes['30_Applied001'].geometry.attributes.position
}

useGLTF.preload('/models/numbers-transformed.glb')
