import React from 'react'
import { Carousel } from "@material-tailwind/react";


const CarouselComponent = () => {
  return (
    <Carousel className="rounded-sm ">
    <img
      src={'/banner.png'}
      alt="image 1"
      className=" w-full "
      style={{ height: "500px" }}
    />
    <img
      src={'/s24.jpg'}
      alt="image 2"
      className=" w-full "
      style={{ height: "500px" }}
    />
    <img
      src={'/iphone 15.jpg'}
      alt="image 3"
      className=" w-full "
      style={{ height: "500px" }}
    />
  </Carousel>

  )
}

export default CarouselComponent