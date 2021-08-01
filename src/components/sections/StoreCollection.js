import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import collectiondata from "../../data/collections.json";

const StoreCollection = () => {
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
    <Row>
      <Slider {...settings}>
        {collectiondata.map((collection, index) => (
          <Col md={4} key={index}>
            <div className="d-flex justify-content-center">
              <NavLink to="/products">
                <p className="text-small text-uppercase">{collection}</p>
              </NavLink>
            </div>
          </Col>
        ))}
      </Slider>
    </Row>
  );
};

export default StoreCollection;
