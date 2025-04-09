import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_TO_CART": {
      const { payload } = action;
      const existingItem = state.find((item) => item.sku_id === payload.sku_id);

      if (existingItem) {
        return state.map((item) =>
          item.sku_id === payload.sku_id
            ? { ...item, quantity: (item.quantity || 50) + (payload.quantity || 50) }
            : item
        );
      }

      return [
        ...state,
        {
          ...payload,
          quantity: payload.quantity || 50,
          price: payload.default_variant?.selling_price || "0",
          stock: payload.default_variant?.stock || "Out of stock",
        },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.sku_id !== action.payload.sku_id);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.sku_id === action.payload.sku_id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Fetch the cart from the backend
  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/carts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      dispatch({ type: "SET_CART", payload: response.data.data });
    } catch (error) {
    }
  }, []);

  useEffect(() => {
    const handleLogin = () => {
      fetchCart();
    };
  
    window.addEventListener("user-logged-in", handleLogin);
    return () => window.removeEventListener("user-logged-in", handleLogin);
  }, [fetchCart]);

  // Add product to the cart
  const addToCart = async (product) => {
    try {
      const payload = {
        fk_product: product.fk_product || product._id, // Ensure product ID is provided
        fk_variant: product.fk_variant || product.default_variant?.int_glCode, // Ensure variant ID is provided
        var_qty: product.quantity || 50, // Default quantity is 50
      };

      
      const response = await axios.put(
        `${baseURL}/v1/carts`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      
      dispatch({ type: "ADD_TO_CART", payload: product });
    } catch (error) {
    }
  };

  // Update quantity of a product in the cart
  const updateQuantity = async (sku_id, fk_product, fk_variant, quantity) => {
    try {
      const payload = { fk_product, fk_variant, var_qty: quantity };

      
      await axios.put(
        `${baseURL}/v1/carts`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );

      dispatch({ type: "UPDATE_QUANTITY", payload: { sku_id, quantity } });
    } catch (error) {
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (sku_id, fk_product, fk_variant) => {
    try {

      await axios.delete(`${baseURL}/v1/carts/${fk_product}/${fk_variant}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      dispatch({ type: "REMOVE_FROM_CART", payload: { sku_id } });
    } catch (error) {
    }
  };

  // Fetch the cart when the component is mounted
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, fetchCart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
