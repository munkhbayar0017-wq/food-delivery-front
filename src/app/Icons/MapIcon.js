import * as React from "react";
const MapIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="M6 2 2 4v10l4-2M6 2l4 2M6 2v10m4-8 4-2v10l-4 2m0-10v10m0 0-4-2"
    />
  </svg>
);
export default MapIcon;
