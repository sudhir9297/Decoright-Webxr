import { Bounds, Center, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const Model = (props) => {
  const gltf = useGLTF(props.currentProduct.glbLink);
  const { scene: Scene } = useThree();
  const TextureLoader = new THREE.TextureLoader();
  TextureLoader.setCrossOrigin("*");

  useEffect(() => {
    Scene.traverse((obj) => {
      Object.entries(props.currentVariation.varData).forEach(([name, data]) => {
        if (name === obj.name && obj.type === "Mesh") {
          if (data.map) {
            const albedoMap = TextureLoader.load(data.map);
            albedoMap.repeat.set(data.repeatX, data.repeatY);
            albedoMap.wrapS = THREE.RepeatWrapping;
            albedoMap.wrapT = THREE.RepeatWrapping;
            albedoMap.colorSpace = THREE.SRGBColorSpace;
            obj.material.map = albedoMap;
          }
          obj.material.color = new THREE.Color(
            data.color,
          ).convertSRGBToLinear();
          obj.material.needsUpdate = true;
        }
      });
    });

    return () => {};
  }, [props.currentVariation]);

  if (!props.position && props.isPresenting) {
    return <></>;
  }
  return <primitive position={props.position} object={gltf.scene} />;
};

export default Model;
