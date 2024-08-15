import React from "react";
import { useCart } from "../Context/CartContext";
import { List, Button, Image, Typography, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="m-5">
      <Title level={2}>Cart Details</Title>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(item.id)}
                  danger
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Image src={item.thumbnail} width={50} />}
                title={item.title}
                description={
                  <>
                    <Text strong>Price: ${item.price}</Text>
                    <div>
                      <Text>Quantity: </Text>
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) =>
                          handleQuantityChange(item.id, value)
                        }
                      />
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
      <div className="mt-5">
        <Title level={3}>Total Amount: ${calculateTotal()}</Title>
      </div>
    </div>
  );
};
