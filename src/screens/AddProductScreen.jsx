import React from "react";
import { useState, useEffect } from "react";
import { useProductAddMutation } from "../slices/adminApiSlice";
import Loader from "../component/Loader";
import {toast} from 'react-toastify'


const AddProductScreen = () => {
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState(0);
    const [image,setImage] = useState(null);

    const [addProduct, {isLoading}] = useProductAddMutation()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const submitHandler = async(e)=>{
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("file", image);

            await addProduct(formData).unwrap()
            toast.success("Product Added");
             // Clear input values after successful submission
            setName('');
            setCategory('');
            setDescription('');
            setPrice(0);
            setImage(null);
        } catch (error) {
            toast.error(err?.data?.message || err.error);
        }
    }


  return (
    <div className="pt-20">
    <h1 className="text-4xl font-bold text-center mb-8">
    Add Product
    </h1>
    <form className="w-full max-w-sm mx-auto mt-8" onSubmit={submitHandler}>
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
            id="inline-price"
            type="number"
            value={price}
            onChange={(e) =>setPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
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
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500"
            id="inline-image"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {isLoading && <Loader />}
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default AddProductScreen;
