import React from "react";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { useGetListedProductsMutation } from "../slices/usersApliSlice";

 

const Products = () => {

  const [products,setProducts] = useState([]);
  const [ getListedProducts] = useGetListedProductsMutation()

  useEffect(() =>{
    const getAllProduct = async () => {
      try {
        const res = await getListedProducts().unwrap();
        setProducts(res);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    getAllProduct();
  },[])
  
  return (
    <div className="pt-10 container mx-auto mb-20 ">
      <h2 className="text-3xl font-semibold mb-6 text-center">Products</h2>
      <div className="flex flex-wrap -mx-4 mt-20">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
