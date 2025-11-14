import FacebookIcon from "../Icons/FacebookIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LogoIcon from "../Icons/LogoIcon";

export function Footer() {
  return (
    <div className="w-screen flex items-center justify-center bg-[#18181B]">
      <div className="flex flex-col gap-[76px] bg-[#18181B] h-[755px] w-[1440px] items-center justify-center">
        <div className="flex gap-[34px] py-7 w-[1440px] bg-[#EF4444] text-[#FAFAFA] font-semibold text-3xl">
          <p>Fresh fast delivered </p>
          <p>Fresh fast delivered </p>
          <p>Fresh fast delivered </p>
        </div>
        <div className="flex flex-col items-center gap-[104px]">
          <div className="flex gap-[220px] items-start w-[1264px]">
            <div className="flex flex-col items-center gap-2">
              <LogoIcon />
              <div className="flex flex-col items-center">
                <p className="text-[#FAFAFA] font-inter text-[18px] font-semibold leading-7">
                  NymNym
                </p>
                <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                  Swift delivery
                </p>
              </div>
            </div>
            <div className="flex gap-28 text-[#FAFAFA] text-base">
              <div className="flex flex-col gap-4">
                <p className="text-[#71717A]">NOMNOM </p>
                <p>Home </p>
                <p>Contact us</p>
                <p>Delivery zone</p>
              </div>
              <div className="flex gap-14 items-end justify-center">
                <div className="flex flex-col gap-4">
                  <p className="text-[#71717A]">MENU</p>
                  <p>Appetizers</p>
                  <p>Salads</p>
                  <p>Pizzas</p>
                  <p>Lunch favorites</p>
                  <p>Main dishes</p>
                </div>
                <div className="flex flex-col gap-4">
                  <p>Side dish </p>
                  <p>Brunch</p>
                  <p>Desserts</p>
                  <p>Beverages</p>
                  <p>Fish & Sea foods</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[#71717A]">FOLLOW US</p>
                <div className="flex gap-4 py-[5px]">
                  <FacebookIcon />
                  <InstagramIcon />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-12 py-8 w-[1264px] text-[#71717A] text-base border-t border-[#71717A]">
            <div className="flex gap-1">
              <p>Copy right 2024</p>
              <p>©</p>
              <p>Nomnom LLC</p>
            </div>
            <p>Privacy policy </p>
            <p>Terms and conditoin</p>
            <p>Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
