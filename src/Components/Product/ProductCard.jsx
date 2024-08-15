import React from "react";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    console.log("Product to be added:", product);
    addToCart(product);
    navigate("/cart");
    toast.success("Product successfully added to cart!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative w-full h-max">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2">
          <span className="bg-red-600 text-white px-4 py-2 rounded-full text-xs font-semibold">
            In Stock: {product.stock}
          </span>
        </div>
        <div className="absolute top-2 left-2 bg-gray-800 text-white rounded-full px-2 py-1 text-xs">
          <span className="font-bold">{product.rating}</span>
          <span className="ml-1">⭐️</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-custom text-green-600">
          {product.title}
        </h3>
        <p className="text-gray-800 text-custom text-sm mt-5 mb-4">
          {product.description}
        </p>
        <div className="mt-24">
          <div className="absolute bottom-10 left-2 text-gray-400">
            <div className="flex items-center ml-5">
              <span className="font-semibold text-2xl text-black">
                ${product.price}
              </span>
              <span className="font-semibold ml-2">
                <del>
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </del>
              </span>
            </div>
          </div>
          <button
            className="absolute text-white bg-green-600 px-2 py-1 text-custom bottom-10 right-5 w-42 h-[34px] rounded-[5px]"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
