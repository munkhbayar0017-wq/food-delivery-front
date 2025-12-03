import Image from "next/image";
import MinusIcon from "../Icons/MinusIcon";
import BlackPlusIcon from "../Icons/BlackPlusIcon";
import { useEffect, useState } from "react";
import RedXIcon from "../Icons/RedXIcon";
const FoodsDetailMap = ({
  foodName,
  price,
  ingredients,
  image,
  orderItems,
  foodId,
  setOrderItems,
  onRemove,
}) => {
  const item = orderItems?.find((i) => i.food === foodId);
  const quantity = item?.quantity ?? 1;

  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  const handleClickMinusButton = () => {
    if (count === 1) {
      return;
    }
    const newCount = count - 1;
    setCount(newCount);
    updateQuantity(newCount);
  };
  const handleClickPlusButton = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateQuantity(newCount);
  };

  const updateQuantity = (newQuantity) => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = orders.map((order) =>
      order.food === foodId ? { ...order, quantity: newQuantity } : order
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrderItems(updatedOrders);
  };

  const handleClickCloseButton = () => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const filteredIds = orders.filter((order) => order.food !== foodId);
    localStorage.setItem("orders", JSON.stringify(filteredIds));
    setOrderItems(filteredIds);

    if (onRemove) {
      onRemove(foodId);
    }
  };

  return (
    <div className="relative flex gap-2.5 w-full h-[120px]">
      <div
        className="absolute z-50 left-100 flex items-center justify-center w-9 h-9 border border-[#EF4444] rounded-full cursor-pointer hover:bg-[#EF4444]/10 hover:border-[#DC2626] transition-all duration-200"
        onClick={handleClickCloseButton}
      >
        <RedXIcon />
      </div>

      <div className="relative w-[124px] h-full rounded-xl">
        <Image
          src={image}
          alt={foodName}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex flex-col justify-between w-[305px] h-full">
        <div className="flex flex-col">
          <div className="text-red-500 font-inter text-[16px] font-semibold leading-8 tracking-[-0.6px]">
            {foodName}
          </div>
          <div className="text-[#09090B] font-inter text-xs font-normal leading-5 max-w-[377px]">
            {ingredients}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-3">
              <button
                className={`flex items-center justify-center w-11 h-11 rounded-full border cursor-pointer transition${
                  count === 1
                    ? "bg-white border-[#D4D4D8] cursor-not-allowed"
                    : "bg-white border-[#09090B] hover:bg-[#F4F4F5]"
                }`}
                onClick={handleClickMinusButton}
                disabled={count === 1}
              >
                <MinusIcon />
              </button>
              <div className="text-[#09090B] font-inter text-[18px] font-semibold leading-7 flex items-center justify-center">
                {count}
              </div>
              <button
                className="flex items-center justify-center w-11 h-11 bg-white border border-[#09090B] cursor-pointer rounded-full hover:bg-[#F4F4F5] transition"
                onClick={handleClickPlusButton}
              >
                <BlackPlusIcon />
              </button>
            </div>
            <div className="text-[#09090B] font-inter text-[16px] font-semibold leading-7">
              {price * count}₮
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodsDetailMap;
