import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Pagination } from "antd";

export const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://dummyjson.com/products/category/${selectedCategory}`
          : "https://dummyjson.com/products";

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="m-5">
      <div>
        <div className="text-2xl text-center m-2">
          Sort Product based on Category:
          <select
            className="w-48 text-black"
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-fit">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={products.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
