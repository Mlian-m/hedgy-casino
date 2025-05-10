import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei'; // Import Text
import * as THREE from 'three';

interface Dice3DProps {
  isSpinning: boolean;
  resultNumber: number | null; // Add prop for the numerical result (1-100)
  winStatus: 'win' | 'loss' | null; // Added prop for win/loss status
  multiplier: number | null;      // Added prop for the achieved multiplier
}

// Define pip positions for each face using the example's structure
type PipPosition = [number, number, number];

const faceOffset = 0.9;
const posA = 0.5;
const posB = 0;

const pipPositions: Record<string, PipPosition[]> = {
  // Face 1 (+Z)
  front: [[posB, posB, faceOffset]] as PipPosition[],
  // Face 6 (-Z)
  back: [
    [-posA, posA, -faceOffset], [-posA, posB, -faceOffset], [-posA, -posA, -faceOffset],
    [posA, posA, -faceOffset], [posA, posB, -faceOffset], [posA, -posA, -faceOffset]
  ] as PipPosition[],
  // Face 3 (+X) - Adjusted from example's right face (2)
  right: [
    [faceOffset, posA, posA],
    [faceOffset, posB, posB],
    [faceOffset, -posA, -posA]
  ] as PipPosition[],
  // Face 4 (-X) - Adjusted from example's left face (5)
  left: [
    [-faceOffset, posA, posA], [-faceOffset, posA, -posA],
    [-faceOffset, posB, posB],
    [-faceOffset, -posA, posA], [-faceOffset, -posA, -posA]
  ] as PipPosition[],
  // Face 2 (+Y)
  top: [
    [posA, faceOffset, posA],
    [-posA, faceOffset, -posA]
  ] as PipPosition[],
  // Face 5 (-Y)
  bottom: [
    [-posA, -faceOffset, posA], [posA, -faceOffset, posA],
    [-posA, -faceOffset, -posA], [posA, -faceOffset, -posA]
  ] as PipPosition[]
};

// Reverse mapping: Face number -> Face key
const numberToFaceKey: Record<number, string> = {
  1: 'front', // +Z
  2: 'top',     // +Y
  3: 'right',   // +X
  4: 'bottom',  // -Y
  5: 'left',    // -X
  6: 'back'     // -Z
};

function SpinningDice(props: Dice3DProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const diceSize = 1.8; // Size used in RoundedBox args
  const pipRadius = 0.15; // Radius for sphere pips
  const baseColor = '#ffffff';
  const pipColor = '#000000';

  useFrame((_state, delta) => {
    if (props.isSpinning && groupRef.current) {
      groupRef.current.rotation.x += delta * 4;
      groupRef.current.rotation.y += delta * 5;
    } else if (!props.isSpinning && groupRef.current) {
      // Optional: Slow down rotation instead of stopping abruptly
      groupRef.current.rotation.x *= 0.95;
      groupRef.current.rotation.y *= 0.95;
    }
  });

  // Determine which face corresponds to the result number (if any)
  const resultFaceKey = useMemo(() => {
    if (props.resultNumber === null) return null;
    // Simple modulo 6 for demo purposes - THIS IS NOT ACCURATE TO A REAL DICE
    // A real implementation would need the actual dice face from the game logic if possible
    const faceNumber = ((props.resultNumber - 1) % 6) + 1;
    return numberToFaceKey[faceNumber];
  }, [props.resultNumber]);

  const createPips = (positions: PipPosition[]) => {
    if (!Array.isArray(positions)) return null;
    return positions.map((pos, index) => (
      <mesh key={index} position={pos}>
        <sphereGeometry args={[pipRadius * 0.8, 16, 16]} />
        <meshStandardMaterial
          color={pipColor}
          metalness={0.1} // Slightly less metallic than example
          roughness={0.4} // Slightly less rough than example
        />
      </mesh>
    ));
  };

  // Determine message and color based on props
  let message = "";
  let messageColor = "#ffffff";
  let resultTextColor = "#22c55e"; // Default to green for result number
  if (!props.isSpinning && props.winStatus) {
    if (props.winStatus === 'win') {
      if (props.multiplier !== null && props.multiplier >= 2) {
        message = "You Doubled It";
        messageColor = "#22c55e"; // Green
      } else {
        message = "You Win!"; // Default win message
        messageColor = "#22c55e"; // Green
      }
    } else { // Loss
      message = "You Lose, Go Home";
      messageColor = "#ef4444"; // Red
      resultTextColor = "#ef4444"; // Use red for loss number too
    }
  }

  return (
    <group ref={groupRef} scale={1.1}> {/* Slightly increase scale for visibility */}
      {/* Main dice cube with rounded corners */}
      <RoundedBox args={[diceSize, diceSize, diceSize]} radius={0.15} smoothness={4}>
        <meshStandardMaterial
          color={baseColor}
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Pips - Conditionally rendered based on resultFaceKey */}
      {Object.entries(numberToFaceKey).map(([numStr, faceKey]) => {
        // Only render pips if spinning OR if this face is NOT the result face
        if (props.isSpinning || faceKey !== resultFaceKey) {
          const positions = pipPositions[faceKey];
          return positions ? createPips(positions) : null;
        }
        return null; // Don't render pips for the result face when stopped
      })}

      {/* Display Result Text when not spinning and result is available */}
      {!props.isSpinning && props.resultNumber !== null && (
        <>
          {/* Result Number Text */}
          <Text
            position={[0, -diceSize * 0.1, diceSize * 0.65]} // Slightly lower position
            fontSize={1.0}
            color={resultTextColor} // Use dynamic color
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {props.resultNumber}
          </Text>
          {/* Win/Loss Message Text */}
          {message && (
            <Text
              position={[0, diceSize * 0.5, diceSize * 0.65]} // Position above number
              fontSize={0.5} // Smaller font size for message
              color={messageColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="#000000"
            >
              {message}
            </Text>
          )}
        </>
      )}
    </group>
  );
}

export default function Dice3D(props: Dice3DProps) {
  return (
    <div style={{ height: '150px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Canvas className="diceHolder" camera={{ position: [0, 0, 4], fov: 50 }}> {/* Adjusted camera slightly closer */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.8} />
        <SpinningDice
          isSpinning={props.isSpinning}
          resultNumber={props.resultNumber}
          winStatus={props.winStatus}
          multiplier={props.multiplier}
        />
      </Canvas>
    </div>
  );
}