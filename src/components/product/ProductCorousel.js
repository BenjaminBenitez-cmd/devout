import React, { useState } from "react";
import ProductCard from "./ProductCard";
//product data
import productdata from "../../data/productdetails.json";
import ItemsCarousel from "react-items-carousel";
import { useQuery } from "react-query";
import ProductRequests from "../../api/product.requests";

const ProductCorousel = () => {
  const { isLoading, data } = useQuery("products", ProductRequests.getMany);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {isLoading && <div>Loading Products</div>}
        {data &&
          data.products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
      </ItemsCarousel>
    </div>
  );
};

export default ProductCorousel;
