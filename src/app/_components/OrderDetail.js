import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartIcon from "../Icons/CartIcon";
import WhiteCartIcon from "../Icons/WhiteCartIcon";
import { useState, useEffect } from "react";
import axios from "axios";
import FoodsDetailMap from "./FoodsDetailMap";
import LogoIcon from "../Icons/LogoIcon";
import { LoginFirst } from "./LoginFirst";
import { useFoodCategory } from "../_provider/FoodCategory";
import Image from "next/image";
import FoodIcon from "../Icons/FoodIcon";
import TimerIcon from "../Icons/TimerIcon";
import MapIcon from "../Icons/MapIcon";

export function OrderDetail({ open, setOpen }) {
  const [orderItems, setOrderItems] = useState([]);
  const [active, setActive] = useState("Cart");
  const [foodsDetail, setFoodsDetail] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders, fetchOrders, fetchOrderById } = useFoodCategory();

  useEffect(() => {
    if (open) {
      fetchOrders();
    }
  }, [open, fetchOrders]);

  const [value, setValue] = useState(
    typeof window !== "undefined"
      ? window?.localStorage?.getItem("location")
      : ""
  );
  const [isClick, setIsClick] = useState(false);
  console.log("selectedOrder---", selectedOrder);

  const handleOrderClick = async (orderId) => {
    try {
      const order = await fetchOrderById(orderId);
      setSelectedOrder(order);
      setActive("Order");
    } catch (err) {
      toast.error("Failed to load order details");
    }
  };

  // useEffect(() => {
  //   fetchOrderById("693791aa884ffa38e65bde96");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleClickOrderButton = () => {
    setActive("Order");
  };
  const handleClickCartButton = () => {
    setActive("Cart");
  };
  const fetchFoods = async (orders) => {
    if (!orders || orders.length === 0) {
      setFoodsDetail([]);
      return;
    }

    try {
      const validOrders = orders.filter((item) => item && item.food);

      const mergedOrders = validOrders.reduce((acc, item) => {
        const existingItem = acc.find((i) => i.food === item.food);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, []);

      const uniqueFoodIds = [...new Set(mergedOrders.map((item) => item.food))];
      const promises = uniqueFoodIds.map((foodId) => {
        return axios.get(`http://localhost:168/food/foodId/${foodId}`);
      });
      const response = await Promise.all(promises);

      setFoodsDetail(
        response.map((res) => {
          return {
            ...res.data,
            quantity: mergedOrders.find((item) => item.food === res.data._id)
              .quantity,
          };
        })
      );
    } catch (err) {
      console.error("Failed to fetch foods", err);
    }
  };
  useEffect(() => {
    if (open) {
      const localStorageOrders = window.localStorage.getItem("orders");
      if (localStorageOrders) {
        const parsedArray = JSON.parse(localStorageOrders);
        setOrderItems(parsedArray);
        if (parsedArray && parsedArray.length > 0) {
          fetchFoods(parsedArray);
        }
      }
    }
  }, [open]);

  const totalPrice = orderItems.reduce((sum, item) => {
    const food = foodsDetail.find((f) => f._id === item.food);
    if (food) {
      return sum + food.price * item.quantity;
    }
    return sum;
  }, 0);
  const total = totalPrice + 5000;

  const handleRemoveFood = (foodId) => {
    setFoodsDetail(foodsDetail.filter((food) => food._id !== foodId));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FFFFFF] cursor-pointer hover:bg-gray-300 hover:text-black transition-colors duration-200">
          <CartIcon />
        </div>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] w-[535px] rounded-l-2xl p-8">
        <SheetHeader>
          <div className="flex gap-3 items-center">
            <WhiteCartIcon />
            <SheetTitle className="text-[#FAFAFA] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
              Order detail
            </SheetTitle>
          </div>
        </SheetHeader>
        <div className="h-11 bg-[#FFFFFF] rounded-full flex items-center justify-center gap-2 p-1">
          <div
            onClick={handleClickCartButton}
            className={`h-9 w-full rounded-full flex justify-center items-center font-inter text-[18px] font-normal leading-7 transition-colors duration-200 cursor-pointer ${
              active === "Cart"
                ? "bg-[#EF4444] text-white"
                : "text-[#09090B] bg-white"
            }`}
          >
            Cart
          </div>
          <div
            onClick={handleClickOrderButton}
            className={`h-9 w-full rounded-full flex justify-center items-center font-inter text-[18px] font-normal leading-7 transition-colors duration-200 cursor-pointer ${
              active === "Order"
                ? "bg-[#EF4444] text-white"
                : "text-[#09090B] bg-white"
            }`}
          >
            Order
          </div>
        </div>
        {active === "Cart" && (
          <div className="h-full gap-6 flex flex-col justify-between">
            <div className="h-full flex flex-col gap-5 p-4 bg-white rounded-[20px] transition-colors duration-200">
              <SheetTitle className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                My cart
              </SheetTitle>
              {foodsDetail.length !== 0 && (
                <div className="flex flex-col justify-between h-full">
                  <div className="h-fit overflow-y-auto">
                    <div className="h-full flex flex-col gap-5">
                      {foodsDetail.map((food) => (
                        <FoodsDetailMap
                          key={food._id}
                          foodName={food.foodName}
                          price={food.price}
                          ingredients={food.ingredients}
                          image={food.image}
                          orderItems={orderItems}
                          foodId={food._id}
                          setOrderItems={setOrderItems}
                          onRemove={handleRemoveFood}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="sheet-demo-name"
                      className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]"
                    >
                      Delivery location
                    </Label>
                    <Input
                      value={value}
                      id="sheet-demo-name"
                      placeholder="Please share your complete address"
                      className="h-20"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                    {isClick && value.length === 0 && (
                      <div className="text-[#EF4444] font-inter text-[12.8px] font-normal leading-[19.2px]">
                        Please complete your address
                      </div>
                    )}
                  </div>
                </div>
              )}
              {foodsDetail.length === 0 && (
                <div className="h-[328px] gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200">
                  <div className="w-full h-[182px] bg-[#F4F4F5] rounded-xl flex flex-col items-center justify-center px-12 py-8">
                    <LogoIcon />
                    <div className="text-[#09090B] text-center font-inter text-base font-bold leading-7">
                      Your cart is empthy
                    </div>
                    <div className="text-[#71717A] text-center font-inter text-xs font-normal leading-4">
                      Hungry? 🍔 Add some delicious dishes to your cart and
                      satisfy your cravings!
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="h-fit w-full bg-white rounded-[20px] p-4 flex flex-col gap-5">
              <SheetTitle className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                Payment info
              </SheetTitle>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="text-[#71717A] font-inter text-base font-normal leading-7">
                    Items
                  </div>
                  <div className="text-[#09090B] text-right font-inter text-lg font-semibold leading-7">
                    {totalPrice}₮
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[#71717A] font-inter text-base font-normal leading-7">
                    Shipping
                  </div>
                  <div className="text-[#09090B] text-right font-inter text-lg font-semibold leading-7">
                    {5000}₮
                  </div>
                </div>
              </div>
              <div className="w-full h-px border-t-2 border-dashed"></div>
              <div className="flex justify-between">
                <div className="text-[#71717A] font-inter text-base font-normal leading-7">
                  Total
                </div>
                <div className="text-[#09090B] text-right font-inter text-lg font-semibold leading-7">
                  {total}₮
                </div>
              </div>
              <SheetFooter>
                {/* {value.length !== 0 && <LoginFirst setIsClick={setIsClick} />} */}
                <LoginFirst
                  setIsClick={setIsClick}
                  isClick={isClick}
                  disabled={
                    !value || value.length === 0 || foodsDetail.length === 0
                  }
                  total={total}
                  setFoodsDetail={setFoodsDetail}
                />
              </SheetFooter>
            </div>
          </div>
        )}
        {active === "Order" && (
          <div className="h-[873px] flex flex-col gap-5 p-4 bg-white rounded-[20px] transition-colors duration-200">
            <SheetTitle className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
              Order history
            </SheetTitle>
            {orders.length === 0 ? (
              <div className="h-[328px] gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200">
                <div className="w-full h-[182px] bg-[#F4F4F5] rounded-xl flex flex-col items-center justify-center px-12 py-8">
                  <LogoIcon />
                  <div className="text-[#09090B] text-center font-inter text-base font-bold leading-7">
                    No Orders Yet?
                  </div>
                  <div className="text-[#71717A] text-center font-inter text-xs font-normal leading-4">
                    🍕 &quot;You haven&apos;t placed any orders yet. Start
                    exploring our menu and satisfy your cravings!&quot;
                  </div>
                </div>
              </div>
            ) : (
              <div className="gap-5 overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200">
                {orders.map((item) => {
                  return (
                    <div key={item._id} className="flex flex-col gap-3 p-3">
                      <div className="flex justify-between items-center">
                        <div className="text-[#09090B] font-inter text-[16px] font-bold leading-7">
                          {item.totalPrice}₮
                        </div>
                        <div className="flex items-center justify-center text-[#09090B] font-inter text-[12px] font-semibold leading-4 border rounded-full w-[68px] h-7">
                          {item.status}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {item.foodOrderItems.map((item) => {
                          return (
                            <div key={item._id}>
                              <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                  <FoodIcon />
                                  <div className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                                    {item.food.foodName}
                                  </div>
                                </div>

                                <div className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                                  x {item.quantity}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-2">
                        <TimerIcon />
                        <div className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                          {item.updatedAt.split("T")[0]}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <MapIcon />
                        <div className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                          {item.address}
                        </div>
                      </div>
                      <div className="border-t w-full h-px"></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
