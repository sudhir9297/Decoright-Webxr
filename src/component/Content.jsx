import React from "react";

function Content({ currentProduct, currentVariation, handleTexture }) {
  return (
    <div className="h-1/2 overflow-hidden border-t bg-white">
      <div className="p-6">
        <div>
          <div className="color-[#161616] mb-2.5 text-2xl font-bold">
            {currentProduct.name}
          </div>
          <div className="color-[#9b9a99] text-base">
            {currentVariation.varDesc}
          </div>
        </div>
        <div className="mt-4">
          <div className="text-md">Variation:</div>
          <div className="my-2 flex flex-row">
            {currentProduct.variation.map((el) => {
              return (
                <div
                  className={`mr-2.5 h-[45px] w-[45px] overflow-hidden rounded-full border p-1 ${
                    el.id === currentVariation.id && "border-2 border-[#161616]"
                  }`}
                  key={el.id}
                  onClick={() => handleTexture(el)}
                >
                  <img
                    src={el.thumbnail}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="my-2.5 flex flex-row items-center justify-end">
          <div className="color-[#161616] mb-2.5 text-2xl font-bold">
            Rs.{currentVariation.price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
