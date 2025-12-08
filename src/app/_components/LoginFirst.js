import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useFoodCategory } from "../_provider/FoodCategory";

export function LoginFirst({ setIsClick, disabled, isClick, total }) {
  const router = useRouter();
  const { postOrder } = useFoodCategory();
  const token = localStorage.getItem("token");
  const handleClickSignupButton = () => {
    router.push("/signup");
  };

  const handleClickLoginButton = () => {
    router.push("/login");
  };

  const createOrder = async () => {
    const foodQuantity = localStorage.getItem("orders");
    const address = localStorage.getItem("location");
    console.log("addressss", address);
    try {
      await postOrder({
        totalPrice: total,
        foodOrderItems: JSON.parse(foodQuantity),
        address: address,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickCheckoutButton = () => {
    if (token) {
      createOrder();
    } else {
      setIsClick(true);
    }
  };

  return (
    <>
      <Button
        className="w-full bg-[#EF4444] h-11 rounded-full text-[#FAFAFA] font-inter text-sm font-medium leading-5 cursor-pointer hover:bg-red-600 transition-colors duration-200"
        type="button"
        disabled={disabled}
        onClick={handleClickCheckoutButton}
      >
        Checkout
      </Button>
      <Dialog open={isClick} onOpenChange={setIsClick}>
        <DialogContent className="w-[425px] flex flex-col items-center justify-center gap-12">
          <DialogTitle className="text-[#09090B] font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
            You need to log in first
          </DialogTitle>
          <DialogFooter className="w-[381px] flex gap-4 items-center justify-center">
            <Button
              type="submit"
              className="w-[182.5px]"
              onClick={handleClickLoginButton}
            >
              Log in
            </Button>
            <Button
              variant="outline"
              className="w-[182.5px]"
              onClick={handleClickSignupButton}
            >
              Sign up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
