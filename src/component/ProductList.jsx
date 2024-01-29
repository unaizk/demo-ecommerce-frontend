import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductMutation } from "../slices/adminApiSlice";
import { toast } from "react-toastify";
import { useUnlistProductMutation } from "../slices/adminApiSlice";
import { useListProductMutation } from "../slices/adminApiSlice";
import Loader from "./Loader";

const ProductList = () => {
  const [getProduct, { isLoading }] = useGetProductMutation();
  const [products, setProducts] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const navigate = useNavigate();
  const [listProducts] = useListProductMutation()
  const [unlistProducts] = useUnlistProductMutation()

  const PROFILE_IMAGE_DIR_PATH = 'http://localhost:5000/productImage/';

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await getProduct().unwrap();
        setProducts(res);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    getAllProduct();
  }, [refreshToggle]);

  const listingProduct = async(productId) =>{
   try {
        await listProducts(productId).unwrap()
        toast.success("Product Listed");
        // Toggle the dummy state to trigger a re-render
        setRefreshToggle(!refreshToggle);
   } catch (err) {
        toast.error(err?.data?.message || err.error);
   }
  }

  const unlistingProduct = async(productId) =>{
    try {
        await unlistProducts(productId).unwrap()
        toast.success("Product Unlisted");
        // Toggle the dummy state to trigger a re-render
        setRefreshToggle(!refreshToggle);
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  }

  

  const navigateToEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    if (productToEdit) {
      // Use the useNavigate hook to navigate to the edit page with the product details
      navigate(`/admin/editProduct`, { state: { product: productToEdit } });
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg pt-20">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">
                <img src={PROFILE_IMAGE_DIR_PATH + product.image} alt="Product" style={{ maxWidth: "50px" }} />
              </td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigateToEdit(product._id)}
                >
                  Edit
                </button>
              </td>
              {product.unlist ? (
                <td className="px-6 py-4">
                <button
                  type="button"
                  className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => listingProduct(product._id)}
                >
                  List
                </button>
              </td>
              ) : (
                <td className="px-6 py-4">
                <button
                  type="button"
                  className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => unlistingProduct(product._id)}
                >
                  Unlist
                </button>
              </td>
              )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
