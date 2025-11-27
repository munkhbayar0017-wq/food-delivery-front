import { Badge } from "@/components/ui/badge";
import PlusIcon from "@/app/Icons/PlusIcon";
import { Button } from "@/components/ui/button";
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
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Foods from "./Foods";

export function FoodMenu() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [foodCounts, setFoodCounts] = useState({});
  console.log("categories", categories);
  console.log("food count", foodCounts);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:168/food-category");
        console.log("response iin data", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategoryButton = async () => {
    try {
      const response = await axios.post("http://localhost:168/food-category", {
        categoryName: newCategoryName,
      });
      setCategories([...categories, response.data]);
      toast.success("Category added!");
      setNewCategoryName("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const handleDeleteButton = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:168/food-category/${id}`
      );
      toast.success("Category deleted successfully!");
      fetchFoods();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  const handleFoodsChange = (categoryId, count) => {
    setFoodCounts((prev) => ({
      ...prev,
      [categoryId]: count,
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col w-full h-44 border rounded-xl p-6 gap-4 bg-[#FFFFFF]">
        <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
          Dishes Category
        </div>
        <div className="flex items-center gap-2 ">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category._id} className="group">
                <Badge
                  variant="outline"
                  className="h-9 flex items-center justify-end gap-2 cursor-pointer"
                >
                  {category.categoryName}
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-center
                     transition-all duration-150 group-hover:opacity-0"
                  >
                    {foodCounts[category._id] || 0}
                  </Badge>
                  <Badge
                    onClick={() => handleDeleteButton(category._id)}
                    className="absolute h-5 min-w-5 rounded-full px-1 text-center bg-red-600 text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-150 cursor-pointer"
                  >
                    ✖
                  </Badge>
                </Badge>
              </div>
            ))}
          </div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <div className="flex w-full flex-wrap gap-2 cursor-pointer">
                  <Badge
                    className="h-9 w-9 rounded-full flex items-center justify-center"
                    variant="destructive"
                  >
                    <PlusIcon />
                  </Badge>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] flex flex-col gap-6 p-6">
                <DialogHeader>
                  <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>

                <div className="grid gap-3">
                  <Label htmlFor="name-1">Category name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Type category name..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <DialogFooter className="flex justify-end">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={handleAddCategoryButton}
                    className="cursor-pointer"
                  >
                    Add category
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col w-full border rounded-xl p-6 gap-4 bg-[#FFFFFF]"
        >
          <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
            {category.categoryName} ({foodCounts[category._id] || 0})
          </div>
          <Foods
            categoryId={category._id}
            categoryName={category.categoryName}
            categories={categories}
            onFoodsChange={(count) => handleFoodsChange(category._id, count)}
          />
        </div>
      ))}
    </div>
  );
}
