import * as React from "react";
const TimerIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="M4.5.5h2.667m-1.334 8 2-2m3.334 2A5.333 5.333 0 1 1 .5 8.5a5.333 5.333 0 0 1 10.667 0Z"
    />
  </svg>
);
export default TimerIcon;
