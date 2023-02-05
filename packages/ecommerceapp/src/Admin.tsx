import React, { useState } from "react";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Input, Button } from "antd";
import { ECOMMERCE_API_NAME } from "./util/const";

const initialState = {
  name: "",
  price: "",
};

function Admin() {
  const [itemInfo, updateItemInfo] = useState(initialState);
  function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
    const formData = {
      ...itemInfo,
      [e.target.name]: e.target.value,
    };
    updateItemInfo(formData);
  }

  async function addItem() {
    try {
      const data = {
        body: { ...itemInfo, price: parseInt(itemInfo.price) },
      };
      updateItemInfo(initialState);
      await API.post(ECOMMERCE_API_NAME, "/products", data);
    } catch (err) {
      console.log("error adding item...");
    }
  }
  return (
    <div style={containerStyle}>
      <Input
        name="name"
        onChange={updateForm}
        value={itemInfo.name}
        placeholder="Item name"
        style={inputStyle}
      ></Input>
      <Input
        name="price"
        onChange={updateForm}
        value={itemInfo.price}
        placeholder="Item price"
        style={inputStyle}
      ></Input>
      <Button style={buttonStyle} onClick={addItem}>
        Add Product
      </Button>
    </div>
  );
}

const containerStyle = { width: 400, margin: "20px auto" };
const inputStyle = { marginTop: 10 };
const buttonStyle = { marginTop: 10 };

export default withAuthenticator(Admin);
