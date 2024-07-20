import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDeatils() {
  const [singleprod, setSingleprod] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log(response.data);
    setSingleprod(response.data);
  };

  console.log(singleprod);

  return (
    <div>
      <h1>{singleprod.id}</h1>
      <p>{singleprod.description}</p>
    </div>
  );
}
