import React from "react";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import {toast} from 'react-toastify'
import { useAddToCartMutation } from "../slices/usersApliSlice";

const ProductDetailPage = () => {

    // Use the useLocation hook to get the location object
    const location = useLocation();
    // Retrieve the product details from the location state
    const product = location.state?.product || {};

    const [addToCart] = useAddToCartMutation();

    const [name, setName] = useState(product.name || '');
    const [category, setCategory] = useState(product.category || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState(product.price || 0);
    const [image, setImage] = useState(product.image);
    const [productId, setProductId] = useState(product._id);

    const IMAGE_URL = `http://localhost:5000/productImage/${image}`

    const addToCartHandler = async(productId) =>{
        console.log(productId,'product');
        try {

            await addToCart({productId}).unwrap()
            toast.success("Product added to cart");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  
  return (
    <div className="container mx-auto p-4 pt-20 shadow-sm">
      <div className="bg-white rounded-lg  p-8">
        <div className="flex flex-col lg:flex-row">
          <div
            className="mr-8 lg:mb-0 mb-4"
            style={{
              width: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={IMAGE_URL}
              alt='image'
              className=" rounded-lg mx-auto shadow-sm  lg:h-auto"
              style={{height: '500px'}}
            />
          </div>
          <div className="sm:mx-auto md:mx-auto lg:mx-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {name}
            </h2>
            <p className="text-gray-500  mb-2">
            ₹{price} 
            </p>
            <p className="text-black-600 mb-4">
              <span className="font-bold">Category:</span> {category}
            </p>
    
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-black-600 mb-4">
              <span className="font-bold">Colour:</span> Grey
            </p>
            <div className="flex pb-5">
                <div className="rounded-full bg-black w-9 h-9 mx-2 shadow-md hover:shadow-lg transition-all"></div>
                <div className="rounded-full bg-red-400 w-9 h-9 mx-2 shadow-md hover:shadow-lg transition-all"></div>
                <div className="rounded-full bg-green-800 w-9 h-9 mx-2 shadow-md hover:shadow-lg transition-all"></div>
                <div className="rounded-full bg-gray-800 w-9 h-9 mx-2 shadow-md hover:shadow-lg transition-all"></div>
                <div className="rounded-full bg-blue-800 w-9 h-9 mx-2 shadow-md hover:shadow-lg transition-all"></div>
            </div>

            <p className="text-black-600 mb-4">
              <span className="font-bold">Internal Memory:</span>{" "}
              128 GB
            </p>

            <div className="mb-20">
              <p className="text-black font-bold mb-2">Storage:</p>

              <div className="flex gap-4">
                
                  <div
                    className="border border-gray p-2 text-xs hover:bg-black hover:text-white"
                  >
                    128 GB
                  </div>
                  <div
                    className="border border-gray p-2 text-xs hover:bg-black hover:text-white"
                  >
                    256 GB
                  </div><div
                    className="border border-gray p-2 text-xs hover:bg-black hover:text-white"
                  >
                    512 GB
                  </div><div
                    className="border border-gray p-2 text-xs hover:bg-black hover:text-white"
                  >
                    1 TB
                  </div>
                
              </div>
            </div>
            <hr className="my-6 border-t border-gray-300" />
            <button className="bg-black hover:bg-gray-800 text-white  py-2 px-4 rounded" onClick={() =>{addToCartHandler(productId)}}>
              ADD TO CART
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-4">
              ADD TO WISHLIST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
