import * as React from "react";
const CartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#18181B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.5.5h1.333l1.774 8.28A1.333 1.333 0 0 0 4.94 9.833h6.52a1.333 1.333 0 0 0 1.3-1.046l1.1-4.954H2.547m2.586 9.3a.667.667 0 1 1-1.333 0 .667.667 0 0 1 1.333 0Zm7.334 0a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0Z"
    />
  </svg>
);
export default CartIcon;
