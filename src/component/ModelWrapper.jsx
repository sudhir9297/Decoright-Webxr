import React, { useRef, useState, useEffect } from "react";
import { Bounds, Center } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import Model from "../component/Model";
import { useAR } from "../store/ARContext";

function ModelWrapper({ currentVariation, currentProduct }) {
  const [modelsPosition, setModelsPosition] = useState(null);
  const { startARSession, endARSession } = useAR();

  const { isPresenting } = useXR();

  useEffect(() => {
    // Assume you have logic to start the AR session

    if (isPresenting) {
      startARSession();
    }

    return () => {
      // Logic to clean up the AR session
      endARSession();
    };
  }, [isPresenting]);

  const placeModel = (e) => {
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
          <ringGeometry args={[0.2, 0.25, 15]} />
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
