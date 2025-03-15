import React from "react";

export const Card = ({ className, children }) => {
  return <div className={`rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
