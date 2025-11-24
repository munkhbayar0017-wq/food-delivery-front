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
import EditIcon from "@/app/Icons/EditIcon";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DeleteIcon from "@/app/Icons/DeleteIcon";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Foods() {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foods, setFoods] = useState([]);

  // const [image, setImage] = useState(null);

  // const handleAddDishButton = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("foodName", foodName);
  //     formData.append("price", price);
  //     formData.append("ingredients", ingredients);
  //     // formData.append("image", image);
  //     const response = await axios.post(
  //       "http://localhost:168/foodauthenticationrouter/post-food",
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     toast.success("Dish added successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to add dish");
  //   }
  // };
  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:168/food");
      setFoods(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Failed to fetch food", error);
    }
  };

  const handleAddDishButton = async (e) => {
    e.preventDefault(); // form submit refresh болиулах
    try {
      const response = await axios.post("http://localhost:168/food", {
        foodName,
        price,
        ingredients,
      });
      setFoods([...foods, response.data]);
      setFoodName("");
      setPrice("");
      setIngredients("");
      toast.success("Dish added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add dish");
    }
  };
  const handleSaveChangesButton = async (id) => {
    try {
      const response = await axios.put("http://localhost:168/food", {
        id,
        foodName,
        price,
        ingredients,
      });

      toast.success("Dish changed successfully!");
      fetchFoods();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    }
  };

  const handleDeleteButton = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:168/food/${id}`);
      toast.success("Dish deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete dish");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchFoods();
  }, []);

  return (
    <div className="flex flex-col w-full border rounded-xl p-6 gap-4 bg-[#FFFFFF]">
      <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
        Appetizers (6)
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* MAP guuh heseg */}
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
                  Add new Dish to Appetizers
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new Dish to Appetizers</DialogTitle>
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
                    className="h-[200px] border-2 border-dashed border-[#2563EB]/50 bg-[#2563EB]/20 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer"
                  >
                    <div className="w-8 h-8 flex items-center bg-[#FFFFFF] rounded-full justify-center">
                      <FileIcon />
                    </div>
                    <p className="text-gray-600 text-center">
                      Choose a file or drag & drop it here
                    </p>
                    {/* <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  /> */}
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
          <div
            key={food._id}
            className="w-[270px] h-[241px] border rounded-xl p-4 flex flex-col gap-5"
          >
            <div className="h-[129px] rounded-xl bg-amber-700 flex items-end justify-end p-5">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <div
                      className="bg-white rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setFoodName(food.foodName);
                        setPrice(food.price);
                        setIngredients(food.ingredients);
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
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">Blueber</SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">Pineap</SelectItem>
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
                        <Label htmlFor="image" className="w-[120px]">
                          Image
                        </Label>
                        <label
                          htmlFor="image"
                          className="h-[116px] w-full border-2 border-dashed border-[#2563EB]/50 bg-[#2563EB]/20 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 flex items-center bg-[#FFFFFF] rounded-full justify-center">
                            <FileIcon />
                          </div>
                          <p className="text-gray-600 text-center">
                            Choose a file or drag & drop it here
                          </p>
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setImage(e.target.files[0])}
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
                  {food.price}tugrik
                </div>
              </div>
              <div className="text-[#09090B] font-inter text-xs font-normal leading-4">
                {food.ingredients}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
