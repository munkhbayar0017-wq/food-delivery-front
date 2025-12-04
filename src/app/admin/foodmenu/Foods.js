"use client";
import { Badge } from "@/components/ui/badge";
import PlusIcon from "@/app/Icons/PlusIcon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FileIcon from "@/app/Icons/FileIcon";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as React from "react";
import Image from "next/image";
import FoodsMap from "@/app/_components/FoodsMap";

export default function Foods({
  categoryId,
  categoryName,
  onFoodsChange,
  categories,
}) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foods, setFoods] = useState([]);
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  const UPLOAD_PRESET = "food-delivery";
  const CLOUD_NAME = "dyntg7qqu";

  const UploadImage = async (file) => {
    console.log("file", file);
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
    }
  };

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageLoading(true);
    try {
      const url = await UploadImage(file);
      setImage(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
      toast.error("Failed to upload image");
    } finally {
      setImageLoading(false);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get(
        `http://localhost:168/food/${categoryId}`
      );
      setFoods(response.data);
      console.log("response.data", response.data);
      if (onFoodsChange) {
        onFoodsChange(response.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch food", error);
    }
  };

  const handleAddDishButton = async () => {
    if (!foodName || !price) {
      toast.error("Please fill in food name and price");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:168/food",
        {
          foodName,
          price,
          ingredients,
          category: categoryId,
          image: image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("token", token);
      console.log("response", response);

      const updatedFoods = [...foods, response.data];
      setFoods(updatedFoods);

      if (onFoodsChange) {
        onFoodsChange(updatedFoods.length);
      }

      setFoodName("");
      setPrice("");
      setIngredients("");
      setImage("");
      toast.success("Dish added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add dish");
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchFoods();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <div className="w-[270px] h-[241px] border border-dashed border-red-500 rounded-xl flex flex-col gap-6 items-center justify-center cursor-pointer">
              <Badge
                className="h-9 w-9 rounded-full flex items-center justify-center"
                variant="destructive"
              >
                <PlusIcon />
              </Badge>
              <div className="w-[145px] text-[#18181B] text-center font-inter text-[14px] font-medium leading-5">
                Add new Dish to {categoryName}
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="flex gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Food name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Type food name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Food price</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Enter price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Ingredients</Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder="List ingredients..."
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="h-[90px] pt-2 text-start placeholder:text-start"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="image">Food image</Label>
                <label
                  htmlFor="image"
                  className="relative h-[200px] object-cover border-2 border-dashed border-[#2563EB]/50 bg-[#2563EB]/20 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer"
                >
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                      <p className="text-white font-medium text-sm">
                        Uploading...
                      </p>
                    </div>
                  )}
                  {image && !imageLoading && (
                    <Image
                      src={image}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  )}
                  {!image && !imageLoading && (
                    <>
                      <div className="w-8 h-8 flex items-center bg-[#FFFFFF] rounded-full justify-center z-10">
                        <FileIcon />
                      </div>
                      <p className="text-gray-600 text-center z-10">
                        Choose a file or drag & drop it here
                      </p>
                    </>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadImage}
                    disabled={imageLoading}
                  />
                </label>
              </div>
            </div>
            <DialogFooter className="flex justify-end">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  onClick={handleAddDishButton}
                  className="cursor-pointer"
                >
                  Add Dish
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {foods.map((food) => (
        <FoodsMap
          key={food._id}
          food={food}
          categories={categories}
          onUpdated={fetchFoods}
          onDeleted={fetchFoods}
        />
      ))}
    </div>
  );
}
