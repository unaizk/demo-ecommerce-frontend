import React from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { useAddToCartMutation } from "../slices/usersApliSlice";

const ProductCard = ({ _id,name, description, price, image, category }) => {

    const PROFILE_IMAGE_DIR_PATH = `http://localhost:5000/productImage/${image}`;

    const navigate = useNavigate();

    const [addToCart] = useAddToCartMutation();


    const navigateToProductDetailPage = () =>{
        const productDetail = { _id,name, description, price, image, category}
        // Use the useNavigate hook to navigate to the Product Detail page with the product details
        navigate(`/productDetail`, { state: { product: productDetail } });
        
    }


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
      <div className="lg:w-1/3 sm:w-full mb-8 lg:mb-0" style={{marginBottom : '30px'}} >
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mx-auto" style={{width : '350px'}}>
          <div className="relative mx-4 mt-4 overflow-hidden bg-white bg-clip-border rounded-xl h-60 lg:h-96" onClick={() =>{navigateToProductDetailPage()}}>
            <img src={PROFILE_IMAGE_DIR_PATH} alt="card-image" className=" w-full h-full" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {name}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              ₹{price}
              </p>
            </div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
              {description}
            </p>
          </div>
          <div className="p-6 pt-0">
            <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-black-900/10 hover:shadow-black-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100" type="button"
            onClick={() =>{addToCartHandler(_id)}}
           >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };


  export default ProductCard;