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

  const UPLOAD_PRESET = "food-delivery";
  const CLOUD_NAME = "dyntg7qqu";

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:168/food-category");
      setCategories(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch categories", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

  const postCategories = async (categoryName) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:168/food-category",
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
      await axios.delete(`http://localhost:168/food-category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        `http://localhost:168/food/${categoryId}`
      );
      setFoods(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch food", error);
      toast.error("Failed to fetch foods");
      return [];
    }
  };

  const postFood = async (foodData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:168/food", foodData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        "http://localhost:168/food",
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
      await axios.delete(`http://localhost:168/food/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, []);

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
      }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
