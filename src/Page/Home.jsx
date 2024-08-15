import React from "react";
import { ProductDisplay } from "../Components/Product/ProductDisplay";
import { Navbar } from "../Components/Navbar/Navbar";

export const Home = () => {
  return (
    <>
      <div className="back">
        <Navbar />
        <div className="mt-5 text-4xl text-center text-green-600">
          Welcome!!{" "}
        </div>
        <div>
          <ProductDisplay />
        </div>
      </div>
    </>
  );
};
