import React, { Suspense, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Content from "../component/Content";
import Loader from "../component/Loading";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Trigger from "../component/Trigger";

import { ARButton, XR } from "@react-three/xr";
import ModelWrapper from "../component/ModelWrapper";
import { ProductList } from "../constant/productData";
import { getProductRecursively } from "../constant/utils";
import OverlayVariation from "../component/OverlayVariation";

function ProductPage() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const productName = queryParam.get("productName");

  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentVariation, setActiveVariation] = useState(null);

  const [overlayContent, setOverlayContent] = useState(null);

  let interfaceRef = useCallback((node) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  });

  useEffect(() => {
    const product = getProductRecursively(ProductList, productName);
    setCurrentProduct(product);
    setActiveVariation(product.variation[0]);
    return () => {};
  }, [productName]);

  const handleTexture = (currentVariation) => {
    setActiveVariation(currentVariation);
  };

  if (currentProduct === null) {
    return <Loader />;
  }

  return (
    <div className="relative h-screen">
      <div className="relative h-1/2">
        {loading && <Loader />}
        <ARButton
          className="absolute bottom-2 right-2 z-40 w-fit rounded-md border bg-white px-4 py-2 text-black shadow"
          style={{
            cursor: "pointer",
          }}
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: { root: overlayContent },
          }}
        >
          AR
        </ARButton>
        <Canvas camera={{ position: [-5, 3, 5], fov: 26 }}>
          <XR>
            <OrbitControls />
            <Environment preset="warehouse" />
            <Suspense fallback={<Trigger setLoading={setLoading} />}>
              <ModelWrapper
                currentVariation={currentVariation}
                currentProduct={currentProduct}
              />
            </Suspense>
          </XR>
        </Canvas>
      </div>

      {
        <OverlayVariation
          ref={interfaceRef}
          currentProduct={currentProduct}
          currentVariation={currentVariation}
          handleTexture={handleTexture}
        />
      }
      <Content
        currentProduct={currentProduct}
        currentVariation={currentVariation}
        handleTexture={handleTexture}
      />
    </div>
  );
}

export default ProductPage;
