"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FoodCategoryContext = createContext(null);

export const useFoodCategory = () => {
  const context = useContext(FoodCategoryContext);

  if (!context) {
    throw new Error(
      "useFoodCategory must be used inside a <FoodCategoryContext>"
    );
  }
  return context;
};

export const FoodCategoryProvider = ({ children }) => {
  // Categories-------
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const UPLOAD_PRESET = "food-delivery";
  const CLOUD_NAME = "dyntg7qqu";

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://food-delivery-back-d9vv.onrender.com/food-category"
      );
      setCategories(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  const postCategories = async (categoryName) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://food-delivery-back-d9vv.onrender.com/food-category",
        {
          categoryName: categoryName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Category added succesfully!");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const deleteCategories = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://food-delivery-back-d9vv.onrender.com/food-category/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  //Foods CRUD--------

  const fetchFoods = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://food-delivery-back-d9vv.onrender.com/food/${categoryId}`
      );
      setFoods(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch food", error);
      return [];
    }
  };

  const postFood = async (foodData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://food-delivery-back-d9vv.onrender.com/food",
        foodData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Dish added successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add dish", error);
      throw error;
    }
  };

  const updateFood = async (id, foodData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://food-delivery-back-d9vv.onrender.com/food",
        {
          id,
          ...foodData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Dish changed successfully!");
      return response.data;
    } catch (error) {
      console.error("Failed to update dish", error);
      throw error;
    }
  };

  const deleteFood = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://food-delivery-back-d9vv.onrender.com/food/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Dish deleted successfully!");
    } catch (error) {
      console.error("Failed to delete dish", error);
      throw error;
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      toast.error("Failed the upoad image");
      throw error;
    }
  };

  // Orders-------

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://food-delivery-back-d9vv.onrender.com/order",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch order", error);
      toast.error("Failed to fetch order");
      return [];
    }
  };

  const fetchOrderById = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://food-delivery-back-d9vv.onrender.com/order/userId",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch order by id", error);
      return null;
    }
  };

  const postOrder = async (orderData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://food-delivery-back-d9vv.onrender.com/order",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Your order has been successfully placed !");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add order", error);
      throw error;
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://food-delivery-back-d9vv.onrender.com/order",
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status");
      throw error;
    }
  };

  return (
    <FoodCategoryContext.Provider
      value={{
        categories,
        postCategories,
        deleteCategories,
        fetchCategories,
        foods,
        fetchFoods,
        postFood,
        updateFood,
        deleteFood,
        uploadImage,
        orders,
        postOrder,
        fetchOrders,
        updateOrderStatus,
        fetchOrderById,
      }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
