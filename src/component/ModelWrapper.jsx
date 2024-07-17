import React, { useRef, useState } from "react";
import { Environment, OrbitControls, Bounds, Center } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Vector3 } from "three";
import Model from "../component/Model";

function ModelWrapper({ currentVariation, currentProduct }) {
  const [modelsPosition, setModelsPosition] = useState(null);
  const { isPresenting } = useXR();
  const placeModel = (e) => {
    console.log(e);
    let position = e.intersection.object.position.clone();
    setModelsPosition(position);
  };

  const XrHitCube = () => {
    const reticleRef = useRef();
    const { isPresenting } = useXR();
    useThree(({ camera }) => {
      if (!isPresenting) {
        camera.position.z = 3;
      }
    });

    useHitTest((hitMatrix, hit) => {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale,
      );

      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    });

    return (
      <>
        <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
          <ringGeometry args={[0.1, 0.25, 32]} />
          <meshStandardMaterial color={"white"} />
        </mesh>
      </>
    );
  };

  return (
    <>
      {!isPresenting && (
        <Bounds fit clip observe margin={1.2}>
          <Center>
            <Model
              currentVariation={currentVariation}
              currentProduct={currentProduct}
            />
          </Center>
        </Bounds>
      )}

      {isPresenting && (
        <Model
          currentVariation={currentVariation}
          currentProduct={currentProduct}
          position={modelsPosition}
          isPresenting={isPresenting}
        />
      )}

      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <XrHitCube />
        </Interactive>
      )}
    </>
  );
}

export default ModelWrapper;
