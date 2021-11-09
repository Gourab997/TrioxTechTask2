import React, { useContext, useState } from "react";

import Items from "./Items";
import { CartContext } from "./Cart";
import Scrollbars from "react-custom-scrollbars-2";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextareaAutosize,
} from "@mui/material";
import { height } from "@mui/system";

const ContextCart = () => {
  const { item, totalAmount } = useContext(CartContext);

  const [total, setTotal] = useState(totalAmount);
  const [balance, setBalance] = useState(total);
  const handleDiscountOnChange = (e) => {
    const discount = e.target.value;

    const total = totalAmount - (discount / 100) * totalAmount;
    setTotal(total);
  };
  const handleTaxOnChange = (e) => {
    const tax = e.target.value;
    const total = totalAmount + (tax / 100) * totalAmount;
    setTotal(total);
  };
  const handleShippingOnChange = (e) => {
    const shipping = e.target.value;
    const total = totalAmount + parseInt(shipping);
    setTotal(total);
  };

  const handleAmountOnChange = (e) => {
    const amount = e.target.value;
    const balance = total - amount;
    setBalance(balance);
  };
  return (
    <>
      <section className='main-cart-section'>
        <div className='cart-items'>
          <div className='cart-items-container'>
            <Table sx={{ minWidth: 650 }}>
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow style={{ color: "white" }}>
                  <TableCell style={{ color: "white" }}>Item</TableCell>
                  <TableCell style={{ color: "white" }} align='right'>
                    Quantity
                  </TableCell>
                  <TableCell style={{ color: "white" }} align='right'>
                    Rate
                  </TableCell>
                  <TableCell style={{ color: "white" }} align='right'>
                    Amount
                  </TableCell>
                  <TableCell style={{ color: "white" }} align='right'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>

            <Scrollbars>
              {item.map((product) => {
                return <Items key={product.id} {...product} />;
              })}
            </Scrollbars>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ textAlign: "left" }}> Notes </h2>
            <TextareaAutosize
              maxRows={5}
              aria-label='maximum height'
              placeholder='Notes - any relevant information not already covered'
              style={{
                width: 300,
                height: 60,
              }}
            />
            <h2 style={{ textAlign: "left", marginTop: "10px" }}> Terms </h2>
            <TextareaAutosize
              maxRows={4}
              aria-label='maximum height'
              placeholder='Terms and conditions - late fees, payment  methods , delivery schedule'
              style={{
                width: 300,
                height: 60,
              }}
            />
          </div>
          <div className='card-total'>
            <h3>
              SubTotal : <span>{totalAmount}</span>
            </h3>
            <h3>
              Discount :{" "}
              <select
                onChange={handleDiscountOnChange}
                id='discount'
                name='cars'
              >
                <option value='0'>0%</option>
                <option value='2'>2%</option>
                <option value='3'>3%</option>
                <option value='5'>5%</option>
                <option value='10'>10%</option>
              </select>
            </h3>
            <h3>
              Tax :{" "}
              <select
                onChange={handleTaxOnChange}
                id='discount'
                name='discount'
              >
                <option value='0'>0%</option>
                <option value='2'>2%</option>
                <option value='3'>3%</option>
                <option value='5'>5%</option>
                <option value='10'>10%</option>
              </select>
            </h3>
            <h3>
              Shipping{" "}
              <input
                type='number'
                onChange={handleShippingOnChange}
                defaultValue='0'
              />
            </h3>
            <h3>Total: {total}</h3>
            <h3>
              Amount Paid{" "}
              <input
                onChange={handleAmountOnChange}
                type='number'
                defaultValue='0'
              />
            </h3>
            <h3>Balance Due : {balance}</h3>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContextCart;
