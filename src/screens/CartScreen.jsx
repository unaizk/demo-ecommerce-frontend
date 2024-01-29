import React from "react";
import { useEffect, useState } from "react";
import {
  useLoadingCartMutation,
  useChangingQuantityMutation,
  useDeletingProductMutation
} from "../slices/usersApliSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";


const CartScreen = () => {
  
  const [productDetails, setProductDetails] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const navigate = useNavigate();

  const [changeQuantity] = useChangingQuantityMutation();
  const [loadingCart, { isLoading }] = useLoadingCartMutation();
  const [deletingProduct] = useDeletingProductMutation()

  const PROFILE_IMAGE_DIR_PATH = "http://localhost:5000/productImage/";

  useEffect(() => {
    const getCartDetails = async () => {
      try {
        const res = await loadingCart().unwrap();
        setProductDetails(res);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };

    getCartDetails();
  }, [refreshToggle]);

  const changeTheQuantity = async (count, productId) => {
    try {
      await changeQuantity({ count, productId }).unwrap();
      // Toggle the dummy state to trigger a re-render
      setRefreshToggle(!refreshToggle);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = 0;
    if (productDetails.products) {
      productDetails.products.forEach((product) => {
        subtotal += product.productId.price * product.quantity;
      });
    }
    return subtotal;
  };

  const deleteHandleClick = async(productId) => {
    
    const isConfirmed = window.confirm("Do you want to delete this product?");
    if (isConfirmed) {
      await deletingProduct({productId}).unwrap()
      toast.success("Product Deleted");
      // Toggle the dummy state to trigger a re-render
      setRefreshToggle(!refreshToggle);
      console.log("Product deleted!");
    }
  };

  return (
    <>
      <div className="flex bg-gray-100">
        <h1 className="text-2xl font-bold  mx-auto pt-10 pb-10 mt-5 mb-5">
          Cart
        </h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : productDetails.products && productDetails.products.length > 0 ? (
        <div className="h-screen py-8 mt-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg  p-6 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left text-sm font-semibold">
                          PRODUCT
                        </th>
                        <th className="text-left text-sm font-semibold">
                          PRICE
                        </th>
                        <th className="text-left text-sm font-semibold">
                          QUANTITY
                        </th>
                        <th className="text-left text-sm font-semibold">
                          TOTAL
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {productDetails.products.map((product) => (
                        <tr key={product._id} className="border-b">
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4"
                                src={
                                  PROFILE_IMAGE_DIR_PATH +
                                  product.productId.image
                                }
                                alt={product.productId.name}
                              />
                              <span className="font-semibold text-sm">
                                {product.productId.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">₹{product.productId.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={() =>
                                  changeTheQuantity("-1", product.productId._id)
                                }
                              >
                                -
                              </button>
                              <span className="text-center w-8">
                                {product.quantity}
                              </span>
                              <button
                                className="border rounded-md py-2 px-4 ml-2"
                                onClick={() =>
                                  changeTheQuantity("1", product.productId._id)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            ₹{product.productId.price * product.quantity}
                          </td>
                          <td className="py-4" onClick={() => deleteHandleClick(product.productId._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 hover:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr className="my-6 border-t border-gray-300" />
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white p-6 border border-gray-300">
                  <h2 className="text-lg font-semibold mb-4">Cart Totals</h2>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-sm">Subtotal</span>
                    <span>{calculateSubtotal()}</span>
                  </div>

                  <hr className="my-2" />
                  <div className="flex justify-between mb-2 pt-5">
                    <span className="font-semibold text-sm">Total</span>
                    <span className="font-black text-xl">
                      ₹{calculateSubtotal()}
                    </span>
                  </div>
                  <button className="bg-cyan-600 text-white py-3 px-6 text-xs transition duration-500 ease-in-out hover:bg-cyan-900  mt-4 w-full">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg pt-20 p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet. Start
            shopping to fill it up!
          </p>
          <button
            className="bg-cyan-600 text-white py-3 px-6 text-xs transition duration-500 ease-in-out hover:bg-cyan-900  mt-4 w-ful"
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      )}
    </>
  );
};

export default CartScreen;
