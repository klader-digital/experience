/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 ./public/models/chip.glb --transform
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Chip() {
  const { nodes } = useGLTF('/models/chip-transformed.glb')
  return nodes.Object_102004.geometry.attributes.position
}

useGLTF.preload('/models/chip-transformed.glb')