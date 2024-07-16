import React, { useEffect, useState } from "react";

import SingleProduct from "../component/SingleProduct";
import { TabMenu } from "../component/TabMenu";
import { ProductList } from "../constant/productData";
import { CapitalizeSentence, getItems } from "../constant/utils";

const CategoryList = [
  "All",
  ...Object.entries(ProductList).map(([name]) => CapitalizeSentence(name)),
];

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState(CategoryList[0]);
  const [currentCatItem, setCurrentCatItem] = useState({});

  useEffect(() => {
    if (currentCategory === "All") {
      const allItem = getItems(ProductList);
      setCurrentCatItem(allItem);
    } else {
      const allItem = getItems(ProductList, currentCategory.toLowerCase());
      setCurrentCatItem(allItem);
    }

    return () => {};
  }, [currentCategory]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };
  const currentCatItemsList = Object.entries(currentCatItem);

  return (
    <div className="px-4 py-2.5">
      <TabMenu
        categoryList={CategoryList}
        activeID={currentCategory}
        handleCategoryClick={handleCategoryClick}
      />

      <div className="py-2.5 text-sm text-[#797979]">
        {currentCatItemsList.length} Product
      </div>

      <div className="grid w-full grid-cols-2 gap-2 p-2 md:grid-cols-3">
        {currentCatItemsList.map((item) => (
          <SingleProduct key={item[0]} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
