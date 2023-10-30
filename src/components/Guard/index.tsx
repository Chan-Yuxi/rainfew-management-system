import React, { PropsWithChildren, Suspense } from "react";

const Guard: React.FC<PropsWithChildren> = ({ children }) => {
  return <Suspense fallback={<div>Loading</div>}>{children}</Suspense>;
};

export default Guard;
