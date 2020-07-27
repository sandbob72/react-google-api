import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [bears, setBears] = useState([]);
  const [bear, setBear] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);

  const getProducts = async () => {
    const result = await axios.get(
      `https://script.google.com/macros/s/AKfycbzPS3XSDHITKQglGsD3-CcxE12cLd9odZy8PyZAjPSpc1hkrGY/exec?path=/product`
    );
    setBears(result.data.items);
  };

  const getProduct = async (id) => {
    const result = await axios.get(
      `https://script.google.com/macros/s/AKfycbzPS3XSDHITKQglGsD3-CcxE12cLd9odZy8PyZAjPSpc1hkrGY/exec?path=/product/${id}`
    );
    console.log(id);
    setBear(result.data);
  };

  const addProduct = (name, weight) => {
    axios({
      method: "post",
      url:
        "https://script.google.com/macros/s/AKfycbzPS3XSDHITKQglGsD3-CcxE12cLd9odZy8PyZAjPSpc1hkrGY/exec?path=/product",
      headers: {},
      data: {
        name: name,
        price: weight, // This is the body part
      },
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    getProducts()
  };

  const delProduct = (id) => {
    axios({
      method: "post",
      url: `https://script.google.com/macros/s/AKfycbzPS3XSDHITKQglGsD3-CcxE12cLd9odZy8PyZAjPSpc1hkrGY/exec?path=/product/${id}&method=DELETE`,
      headers: {},
      data: {},
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    getProducts()
  };

  const upProduct = (id) => {
    axios({
      method: "post",
      url: `https://script.google.com/macros/s/AKfycbzPS3XSDHITKQglGsD3-CcxE12cLd9odZy8PyZAjPSpc1hkrGY/exec?path=/product/${id}&method=PUT`,
      headers: {},
      data: {
        '#': id,
        name: name,
        price: weight, // This is the body part
      },
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    });
    getProducts()
  };

  const printProduct = () => {
    // console.log("Product:", bears[0].item);
    if (bears && bears.length)
      return bears.map((bear, index) => (
        <li key={index}>
          {bear ? bear.name : "-"} : {bear ? bear.weight : 0}
          <button onClick={() => delProduct(bear["#"])}> Delete {bear.id}</button>
          <button onClick={() => getProduct(bear["#"])}>Get</button>
          <button onClick={() => upProduct(bear["#"])}>Update</button>
        </li>
      ));
    else {
      return <h2>No bears</h2>;
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (bears.length === 0) {
    return <div>load data</div>;
  }

  return (
    <div>
      <h2>Product</h2>
      {/* <ul>{printProduct()}</ul> */}
      {bears.map((bear, index) => (
        <li key={index}>
          {bear ? bear.name : "-"} : {bear ? bear.weight : 0}
          <button onClick={() => delProduct(bear["#"])}> Delete {bear.id}</button>
          <button onClick={() => getProduct(bear["#"])}>Get</button>
          <button onClick={() => upProduct(bear["#"])}>Update</button>
        </li>
      ))}
      selected Product: {bear.name} {bear.weight}
      <h2>Add Product</h2>
      Name:
      <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
      Weight:
      <input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
      <button onClick={() => addProduct(name, weight)}>Add new bear</button>
    </div>
  );
};
