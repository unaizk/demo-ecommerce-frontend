import { apiSlice } from "./apiSlice";

const USER_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query : (data) =>({
                url : `${USER_URL}/auth`,
                method : 'POST',
                body : data
            })
        }),
        register : builder.mutation({
            query:(data)=>({
                url : `${USER_URL}`,
                method : 'POST',
                body : data
            })
        }),
        logout : builder.mutation({
            query : ()=>({
                url : `${USER_URL}/logout`,
                method : 'POST'
            })
        }),
        getListedProducts : builder.mutation({
            query : ()=>({
                url : `${USER_URL}/listed-products`,
                method : 'GET'
            })
        }),
        addToCart : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/add-to-cart`,
                method : 'POST',
                body : data
            })
        }),
        loadingCart : builder.mutation({
            query : ()=>({
                url : `${USER_URL}/cart-details`,
                method : 'GET',
            })
        }),
        changingQuantity : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/change-quantity`,
                method : 'POST',
                body : data
            })
        }),
        deletingProduct : builder.mutation({
            query : (data)=>({
                url : `${USER_URL}/delete-product`,
                method : 'DELETE',
                body : data
            })
        }),
    })
})


export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useGetListedProductsMutation, useAddToCartMutation, useLoadingCartMutation, useChangingQuantityMutation,useDeletingProductMutation} = userApiSlice