import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";

export function LoginFirst({ setIsClick }) {
  const router = useRouter();
  const handleClickSignupButton = () => {
    router.push("/signup");
  };

  const handleClickLoginButton = () => {
    router.push("/login");
  };

  const handleClickCheckoutButton = () => {
    setIsClick(true);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="w-full bg-[#EF4444] h-11 rounded-full text-[#FAFAFA] font-inter text-sm font-medium leading-5 cursor-pointer hover:bg-red-600 transition-colors duration-200"
            type="button"
            onClick={handleClickCheckoutButton}
          >
            Checkout
          </Button>
        </DialogTrigger>
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
      </form>
    </Dialog>
  );
}
