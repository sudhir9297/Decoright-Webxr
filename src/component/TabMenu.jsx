import React, { useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";

export const TabMenu = ({ categoryList, activeID, handleCategoryClick }) => {
  const showPerSlide = categoryList.length >= 2 ? categoryList.length : 1;
  const [isDragging, setDragging] = useState(false);
  const handleClick = (e, o) => {
    e.preventDefault();
    if (isDragging) {
      return;
    }
    handleCategoryClick(o);
  };

  const {
    slideToPrevItem,
    slideToNextItem,
    carouselFragment,
    useListenToCustomEvent,
  } = useSpringCarousel({
    itemsPerSlide: showPerSlide,
    items: categoryList.map((o, idx) => ({
      id: idx,
      renderItem: (
        <div
          key={idx}
          onClick={(e) => handleClick(e, o)}
          className="relative flex w-fit min-w-[100px] cursor-pointer flex-col items-center py-4"
        >
          <div
            className={`text-[30px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              activeID === o ? "text-[#161616]" : "text-[#bfbfc0]"
            }`}
          >
            {o}
          </div>
        </div>
      ),
    })),
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === "onDrag") {
      // Do something...
      if (!isDragging) {
        setDragging(true);
        setTimeout(() => {
          setDragging(false);
        }, 500);
      }
    } else if (event.eventName === "onSlideStartChange") {
      setTimeout(() => {
        setDragging(false);
      }, 1000);
    }
  });

  const onScrollHandler = (e) => {
    if (e.deltaY > 0) {
      slideToNextItem();
    } else {
      slideToPrevItem();
    }
  };

  return (
    <div className="my-2 flex h-12 w-full select-none items-center justify-between">
      <div className="flex-1 overflow-hidden" onWheel={onScrollHandler}>
        {carouselFragment}
      </div>
    </div>
  );
};
