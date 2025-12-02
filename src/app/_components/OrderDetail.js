import { Button } from "@/components/ui/button";
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

export function OrderDetail() {
  const localStorageOrders = window.localStorage.getItem("orders");
  const orderItems = JSON.parse(localStorageOrders);
  const [active, setActive] = useState("Cart");
  const [foodsDetail, setFoodsDetail] = useState([]);
  const [value, setValue] = useState("");
  const [isClick, setIsClick] = useState(false);

  const handleClickOrderButton = () => {
    setActive("Order");
  };
  const handleClickCartButton = () => {
    setActive("Cart");
  };
  console.log("orderItems------ from order datil", orderItems);
  const fetchFoods = async () => {
    try {
      const promises = orderItems.map((items) => {
        return axios.get(`http://localhost:168/food/foodId/${items.food}`);
      });
      const response = await Promise.all(promises);

      setFoodsDetail(
        response.map((res) => {
          return {
            ...res.data,
            quantity: orderItems.find((item) => item.food === res.data._id)
              .quantity,
          };
        })
      );
    } catch (err) {
      console.error("Failed to fetch foods", err);
    }
  };
  useEffect(() => {
    if (orderItems?.length > 0) {
      fetchFoods();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPrice = foodsDetail.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("foodsDetail", foodsDetail);
  return (
    <Sheet>
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
                    {isClick === true && value.length === 0 && (
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
                  {totalPrice + 5000}₮
                </div>
              </div>
              <SheetFooter>
                {value.length !== 0 && <LoginFirst setIsClick={setIsClick} />}
                {value.length === 0 && (
                  <button
                    className="w-full bg-[#ef444488] h-11 rounded-full text-[#FAFAFA] font-inter text-sm font-medium leading-5 cursor-pointer"
                    type="button"
                    onClick={() => setIsClick(true)}
                  >
                    Checkout
                  </button>
                )}
              </SheetFooter>
            </div>
          </div>
        )}
        {active === "Order" && (
          <div className="h-full flex flex-col gap-5 p-4 bg-white rounded-[20px] transition-colors duration-200">
            <SheetTitle className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
              Order history
            </SheetTitle>
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
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
