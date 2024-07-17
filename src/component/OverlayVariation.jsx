import React, { forwardRef } from "react";
const OverlayVariation = forwardRef((props, ref) => {
  const { currentProduct, currentVariation, handleTexture } = props;

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-8 left-4 my-2 flex flex-row">
        {currentProduct.variation.map((el) => {
          return (
            <div
              className={`mr-2.5 h-[45px] w-[45px] overflow-hidden rounded-full border p-1 ${
                el.id === currentVariation.id
                  ? "border-2 border-[#ffffff]"
                  : "border-0"
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
  );
});
export default OverlayVariation;
