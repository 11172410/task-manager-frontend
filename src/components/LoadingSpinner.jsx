import { Spinner } from "flowbite-react";

import React from "react";

function LoadingSpinner({ className = "" }) {
  return <Spinner color="info" aria-label="Loading..." />;
}

export default LoadingSpinner;
