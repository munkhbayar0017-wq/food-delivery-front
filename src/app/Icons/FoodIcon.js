import * as React from "react";
const FoodIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={13}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="M3.167 12.5h6.666m1.667-6 1.667-4M9.333.5c.18.067.534.353.5.907-.04.553-.62.8-.666 1.346-.034.52.226.827.486 1.08M6 .5c.18.067.533.353.493.907-.033.553-.62.8-.653 1.346-.04.52.22.827.48 1.08M2.667.5c.18.067.533.353.5.907-.04.553-.62.8-.667 1.346-.033.52.227.827.493 1.08M6.5 12.5a6 6 0 0 0 6-6H.5a6 6 0 0 0 6 6Z"
    />
  </svg>
);
export default FoodIcon;
