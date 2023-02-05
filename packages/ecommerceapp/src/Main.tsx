import React, { useState, useEffect } from "react";
import Container from "./components/Container";
import { List } from "antd";
import checkUser from "./util/checkUser";
import { API } from "aws-amplify";
import { ECOMMERCE_API_NAME } from "./util/const";

function Main() {
  const [state, setState] = useState<{
    products: { id: string; price: number; name: string }[];
    loading: boolean;
  }>({ products: [], loading: true });
  const [user, updateUser] = useState<{
    username?: string;
    isAuthorized?: boolean;
  }>({});

  let didCancel = false;

  useEffect(() => {
    getProducts();
    checkUser(updateUser);
    return () => {
      didCancel = true;
    };
  }, []);

  async function getProducts() {
    const data = await API.get(ECOMMERCE_API_NAME, "/products", {});
    console.log("data: ", data);
    if (didCancel) return;
    setState({
      products: data.data.items,
      loading: false,
    });
  }

  async function deleteItem(id: string) {
    try {
      const products = state.products.filter((p) => p.id !== id);
      setState({ ...state, products });
      await API.del(ECOMMERCE_API_NAME, "/products", { body: { id } });
      console.log("successfully deleted item");
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={(item) => (
          <List.Item
            actions={
              user.isAuthorized
                ? [
                    <p onClick={() => deleteItem(item.id)} key={item.id}>
                      delete
                    </p>,
                  ]
                : []
            }
          >
            <List.Item.Meta title={item.name} description={item.price} />
          </List.Item>
        )}
      />
    </Container>
  );
}

export default Main;
