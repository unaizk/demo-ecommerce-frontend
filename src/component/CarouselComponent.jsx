import React from 'react'
import { Carousel } from "@material-tailwind/react";


const CarouselComponent = () => {
  return (
    <Carousel className="rounded-sm ">
    <img
      src={'/banner.png'}
      alt="image 1"
      className="   "
      style={{ height: "500px" }}
    />
    <img
      src={'/s24.jpg'}
      alt="image 2"
      className=" object-contain md:w-full lg:w-full "
      style={{ height: "500px" }}
    />
    <img
      src={'/iphone 15.jpg'}
      alt="image 3"
      className=" object-contain md:w-full lg:w-full "
      style={{ height: "500px" }}
    />
  </Carousel>

  )
}

export default CarouselComponent