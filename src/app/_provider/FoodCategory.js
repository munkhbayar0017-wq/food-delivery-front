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

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:168/food-category");
      setCategories(response.data);
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

  return (
    <FoodCategoryContext.Provider
      value={{ deleteCategories, categories, postCategories }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
