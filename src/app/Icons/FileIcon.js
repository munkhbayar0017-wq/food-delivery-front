import * as React from "react";
const FileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      stroke="#09090B"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.5 8.5-2.057-2.057a1.334 1.334 0 0 0-1.886 0L2.5 12.5M1.833.5h9.334c.736 0 1.333.597 1.333 1.333v9.334c0 .736-.597 1.333-1.333 1.333H1.833A1.333 1.333 0 0 1 .5 11.167V1.833C.5 1.097 1.097.5 1.833.5Zm4 4a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
    />
  </svg>
);
export default FileIcon;
