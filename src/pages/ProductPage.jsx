import React, { Suspense, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Content from "../component/Content";
import Loader from "../component/Loading";
import Model from "../component/Model";
import Trigger from "../component/Trigger";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import { getProductRecursively } from "../constant/utils";
import { ProductList } from "../constant/productData";

function ProductPage() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const productName = queryParam.get("productName");

  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentVariation, setActiveVariation] = useState(null);

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
    <div className="h-screen">
      <div className="h-1/2">
        {loading && <Loader />}

        <Canvas camera={{ position: [-5, 2, 5], fov: 26 }}>
          <OrbitControls />
          <Environment preset="warehouse" />

          {/* <directionalLight position={[1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[0, 0, 1]} args={["white", 2]} />
          <directionalLight position={[0, 0, -1]} args={["white", 2]} />
          <directionalLight position={[0, 1, 0]} args={["white", 10]} />
          <directionalLight position={[0, -1, 0]} args={["white", 2]} /> */}
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            <Model
              currentVariation={currentVariation}
              currentProduct={currentProduct}
            />
          </Suspense>
        </Canvas>
      </div>
      <Content
        currentProduct={currentProduct}
        currentVariation={currentVariation}
        handleTexture={handleTexture}
      />
    </div>
  );
}

export default ProductPage;
