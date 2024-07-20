import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDisplay() {
  const [productData, setProductData] = useState([]);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    myFetchData();
  }, []);

  const myFetchData = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    setProductData(response.data);
  };
  const handleNewToOld = async () => {
    const response = await axios.get("https://fakestoreapi.com/products?sort=desc");
    setProductData(response.data);
  };

  const handleOldtoNew = async () => {
    const response = await axios.get("https://fakestoreapi.com/products?sort=aesc");
    setProductData(response.data);
  };
  const handleCategory = async () => {
    let response = await axios.get("https://fakestoreapi.com/products/category/jewelery");

    if (category === "jewelery") {
      setProductData(response.data);
    }
    if (category === "electronics") {
      response = await axios.get("https://fakestoreapi.com/products/category/electronics");
      setProductData(response.data);
    }
    if (category === "men's clothing") {
      response = await axios.get("https://fakestoreapi.com/products/category/men's clothing");
      setProductData(response.data);
    }
    if (category === "women's clothing") {
      response = await axios.get("https://fakestoreapi.com/products/category/women's clothing");
      setProductData(response.data);
    }
  };
  if (productData.length <= 0) {
    return <p>Loadinggg..</p>;
  }
  return (
    <div>
      <div>
        <button onClick={handleNewToOld}>new to old</button>
        <button onClick={handleOldtoNew}>Old to New</button>
        <select onClick={handleCategory} onChange={(e) => setCategory(e.target.value)}>
          <option value="Choose">Category</option>
          <option value="jewelery">jewelery</option>
          <option value="electronics">electronics</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>
      <div>
        {/* all products  */}
        {productData &&
          productData.map((e, i) => {
            return (
              <div key={i}>
                <h1>{e.id}</h1>
                <h2>{e.title}</h2>
                <p>{e.category}</p>
                <button onClick={() => navigate(`products/${e.id}`)}>View</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
