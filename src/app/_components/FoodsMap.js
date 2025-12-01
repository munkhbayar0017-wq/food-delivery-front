"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditIcon from "../Icons/EditIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileIcon from "../Icons/FileIcon";
import { Button } from "@/components/ui/button";
import DeleteIcon from "../Icons/DeleteIcon";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function FoodsMap({ food, categories, onUpdated, onDeleted }) {
  const [foodName, setFoodName] = useState(food?.foodName);
  const [price, setPrice] = useState(food?.price);
  const [ingredients, setIngredients] = useState(food?.ingredients);
  const [image, setImage] = useState(food?.image);
  const [selectedCategory, setSelectedCategory] = useState(food?.category);
  const [imageLoading, setImageLoading] = useState(false);

  const UPLOAD_PRESET = "food-delivery";
  const CLOUD_NAME = "dyntg7qqu";

  const UploadImage = async (file) => {
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
    } finally {
      setImageLoading(false);
    }
  };

  const handleSaveChangesButton = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:168/food",
        {
          id,
          foodName,
          price,
          ingredients,
          category: selectedCategory,
          image: image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Dish changed successfully!");
      onUpdated();

      setFoodName("");
      setPrice("");
      setIngredients("");
      setImage("");
      setSelectedCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    }
  };
  const handleDeleteButton = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`http://localhost:168/food/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Dish deleted successfully!");
      onDeleted();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete dish");
    }
  };

  return (
    <div className="w-[270px] h-[241px] border rounded-xl p-4 flex flex-col gap-5">
      <div className="relative h-[129px] rounded-xl flex items-end justify-end">
        {food.image && (
          <Image
            src={food.image}
            alt={food.foodName}
            fill
            className="object-cover rounded-xl"
          />
        )}
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <div
                className="absolute right-2 bottom-2 bg-white rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setFoodName(food.foodName);
                  setPrice(food.price);
                  setIngredients(food.ingredients);
                  setSelectedCategory(food.category);
                  setImage(food.image || "");
                }}
              >
                <EditIcon />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Dishes info</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="flex gap-3 items-start">
                  <Label htmlFor="name-1" className="w-[120px]">
                    Dish name
                  </Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Type food name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 items-start">
                  <Label htmlFor="name-1" className="w-[120px]">
                    Dish category
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3 items-start">
                  <Label htmlFor="username-1" className="w-[120px]">
                    Ingredients
                  </Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="List ingredients..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="h-[90px] pt-2 text-start placeholder:text-start"
                  />
                </div>
                <div className="flex gap-3 items-start">
                  <Label htmlFor="username-1" className="w-[120px]">
                    Price
                  </Label>
                  <Input
                    id="username-1"
                    name="username"
                    placeholder="Enter price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pt-2 text-start placeholder:text-start"
                  />
                </div>

                <div className="flex gap-3 items-start">
                  <Label htmlFor="edit-image" className="w-[120px]">
                    Image
                  </Label>
                  <label
                    htmlFor="edit-image"
                    className="h-[116px] w-full border-2 border-dashed border-[#2563EB]/50 bg-[#2563EB]/20 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer relative overflow-hidden"
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
                        <div className="w-8 h-8 flex items-center bg-[#FFFFFF] rounded-full justify-center">
                          <FileIcon />
                        </div>
                        <p className="text-gray-600 text-center text-sm">
                          Choose a file or drag & drop it here
                        </p>
                      </>
                    )}
                    <Input
                      id="edit-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadImage}
                      disabled={imageLoading}
                    />
                  </label>
                </div>
              </div>
              <DialogFooter className="flex justify-between w-full">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border border-red-500/50 cursor-pointer"
                    onClick={() => handleDeleteButton(food._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    onClick={() => handleSaveChangesButton(food._id)}
                    className="cursor-pointer"
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="text-red-500 font-inter text-sm font-medium leading-5">
            {food.foodName}
          </div>
          <div className="text-[#09090B] font-inter text-xs font-normal leading-4">
            {food.price}₮
          </div>
        </div>
        <div className="text-[#09090B] font-inter text-xs font-normal leading-4">
          {food.ingredients}
        </div>
      </div>
    </div>
  );
}
