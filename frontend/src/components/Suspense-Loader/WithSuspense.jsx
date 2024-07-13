import React, { Suspense } from "react";
import Loader from "./Loader.jsx";

const WithSuspense = (Component) => {
  return (props) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default WithSuspense;
