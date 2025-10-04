import React from 'react';

const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-4.518a.75.75 0 00-.75.75v4.518l1.903-1.903a5.997 5.997 0 00-9.945 2.628.75.75 0 00.522 1.032l3.32 1.107a.75.75 0 00.867-.442 3.5 3.5 0 016.593-1.423.75.75 0 00.945.337l2.094-.698a.75.75 0 00.504-1.124A9.001 9.001 0 004.755 10.059z"
      clipRule="evenodd"
    />
  </svg>
);

export default ResetIcon;