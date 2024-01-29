import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useEditProductMutation } from '../slices/adminApiSlice';
import {toast} from 'react-toastify'

const EditProductScreen = () => {

    // Use the useLocation hook to get the location object
    const location = useLocation();
    // Retrieve the product details from the location state
    const product = location.state?.product || {};

    const [editProduct] = useEditProductMutation()

    

    const [name, setName] = useState(product.name || '');
    const [category, setCategory] = useState(product.category || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState(product.price || 0);
    const [image, setImage] = useState(product.image);
    const [productId, setProductId] = useState(product._id);
    

    const IMAGE_URL = `http://localhost:5000/productImage/${image}`;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
       
    };
    
    const editSubmitHandle = async(e) =>{
        e.preventDefault();

        try {
            await editProduct({name,category,description,price,image,productId}).unwrap();
            toast.success("Product Edited");
        } catch (error) {
            toast.error(error?.data?.message || err.error);
        }

    }

    

  return (
    <div className="pt-20">
    <h1 className="text-4xl font-bold text-center mb-8">
    Edit Product
    </h1>
    <form onSubmit={editSubmitHandle} className="w-full max-w-sm mx-auto mt-8">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Product Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-product-name"
            type="text"
            
            value={name}
            onChange={(e) =>setName(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-category"
          >
            Category
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-category"
            type="text"
            
            value={category}
            onChange={(e) =>setCategory(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-description"
          >
            Description
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-description"
            type="text"
            
            value={description}
            onChange={(e) =>setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-price"
          >
            Price
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-price"
            type="number"
            
            value={price}
            onChange={(e) =>setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        {IMAGE_URL && <img
            src={IMAGE_URL}
            alt="Product"
            style={{ maxHeight: '50px' , marginLeft : "40px"}} 
          />}
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-image"
          >
            Image
          </label>
          
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-image"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
     
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Edit Product
          </button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default EditProductScreen