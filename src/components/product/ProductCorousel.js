import React from "react";
import ProductCard from "./ProductCard";
//product data
import { useQuery } from "react-query";
import ProductRequests from "../../api/product.requests";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCorousel = () => {
  const { isLoading, data } = useQuery("products", ProductRequests.getMany);

  const chevronWidth = 40;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div style={{ marginTop: "24px" }}>
      {isLoading && <div>Loading Products</div>}
      {data && (
        <Slider {...settings}>
          {data.products.map((product, index) => {
            return (
              <div key={index}>
                <ProductCard {...product} />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default ProductCorousel;
