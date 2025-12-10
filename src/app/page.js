"use client";

import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FoodDetail } from "./_components/FoodDetail";
import { useFoodCategory } from "./_provider/FoodCategory";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { fetchCategories, fetchFoods, categories } = useFoodCategory();
  const [foodsByCategory, setFoodsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);

  // SAIN OILGOOROIII
  const fetchAllFoods = async (categories) => {
    const foodsPromises = categories.map(async (category) => ({
      id: category._id,
      foods: await fetchFoods(category._id),
    }));

    const results = await Promise.all(foodsPromises);

    const foodsData = results.reduce((acc, { id, foods }) => {
      acc[id] = foods;
      return acc;
    }, {});

    setFoodsByCategory(foodsData);
    setLoading(false);
  };
  //AIAIAIAII
  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await fetchCategories();
      // console.log("categoriesData-----", categoriesData);
      if (categoriesData.length > 0) {
        await fetchAllFoods(categoriesData);
      } else {
        setLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col">
        <Header />
        <div className="w-screen bg-[#404040] flex flex-col items-center justify-center">
          <Skeleton className="w-[1440px] h-[570px]" />
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[54px] p-22">
            <Skeleton className="w-[250px] h-9 rounded-full" />
            <div className="grid grid-cols-3 gap-13 ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[210px] w-[365px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Header orderItems={orderItems} />
      <div className="w-screen bg-[#404040] flex flex-col items-center justify-center">
        <div className="w-[1440px] h-[570px] bg-[url('/Image.png')] bg-cover bg-center"></div>
        <div className="p-22">
          <div className="flex flex-col gap-13 ">
            {categories.map((category) => {
              const foods = foodsByCategory[category._id] || [];

              if (foods.length === 0) {
                return null;
              }

              return (
                <div key={category._id} className="flex flex-col w-full gap-13">
                  {/* Category Title */}
                  <div className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
                    {category.categoryName}
                  </div>

                  {/* Foods inside category */}
                  <div className="grid grid-cols-3 gap-9">
                    {foods.map((food) => (
                      <div
                        key={food._id}
                        className="flex flex-col w-[397px] h-[342px] rounded-xl p-4 gap-5 border bg-[#FFFFFF]"
                      >
                        <div className="relative flex items-end justify-end w-[365px] h-[210px] rounded-xl p-15">
                          <FoodDetail
                            foodName={food.foodName}
                            price={food.price}
                            ingredients={food.ingredients}
                            image={food.image}
                            foodId={food._id}
                            orderItems={orderItems}
                            setOrderItems={setOrderItems}
                          />
                          <Image
                            src={food.image}
                            alt={food.foodName}
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>

                        <div className="flex justify-between">
                          <div className="text-red-500 font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                            {food.foodName}
                          </div>
                          <div className="text-[#09090B] font-inter text-[18px] font-semibold leading-7">
                            {food.price}₮
                          </div>
                        </div>

                        <div className="text-[#09090B] font-inter text-sm font-normal leading-5">
                          {food.ingredients}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
