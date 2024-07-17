import React from "react";
import { Link } from "react-router-dom";
function SingleProduct({ item }) {
  return (
    <div className="relative my-2 w-full rounded-xl border bg-white p-4 text-xs drop-shadow-xl md:h-fit lg:h-fit">
      <Link to={`/product?productName=${item[0]}`}>
        <div className="relative w-full overflow-hidden object-cover">
          <img src={item[1].thumbnail} />
        </div>

        <div className="mb-1 mt-4 text-base font-bold text-black">
          {item[1].name}
        </div>
        <div className="mt-1 text-xs text-black">{item[1].desc}</div>
      </Link>
    </div>
  );
}

export default SingleProduct;
