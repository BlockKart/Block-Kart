import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import {ethers} from "ethers";
import Abi from "./../smart-contract/abi.json"
import Web3 from "web3";

const PlaceOrderScreen = ({ history }) => {

  const [boolVal, setBoolVal]=useState(true);
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  function sendEmail() {
    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "forpremiumagain@gmail.com",
      Password: "BA14DB8E8E2B093EC74FD0663C739C41B172",
      To: 'devstrucker01@gmail.com',
      From: "forpremiumagain@gmail.com",
      Subject: "Block-Kart Order!",
      Body: "Congratulations , your order is placed successfully!",
    })
      .then(function (message) {
        // alert("mail sent successfully")
        if(message=="OK"){

          console.log("mail sent successfully");
        }else{
          console.error(message);
        }
      });
  }

  const buyNFTHandler = async(e) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    
    const erc20 = new ethers.Contract("0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e", Abi, signer);
    // const tokenName = await erc20.name();
    
    
    const tokenID = cart.cartItems[0].tokenId +1 ; 
    console.log(tokenID);

    const add1= await erc20.ownerOf(tokenID);
    console.log(add1);

    var web3= new Web3();

    try{
      let val=cart.cartItems[0].price+"";
      console.log(val);
      await erc20.buyNFT(tokenID, {value: val}); //important
    }catch(err){
      console.log(err);
    }
    
    const add2= await erc20.ownerOf(tokenID);
    // console.log(add2);

    let url = "https://rinkeby.etherscan.io/tx/" ;
    // console.log(url);
    
    await erc20.on("Transfer", (from, to, amount, event) => { 
      // console.log({ from, to, amount, event });
      url+= event.transactionHash;
      // window.open(url, '_blank');
      // console.log("hsh: ", event.transactionHash);
      // console.log("url: ", url);
      return;
    });
    
    await sendEmail();
    alert("Congratulations! Order Placed");
    setBoolVal(false);
    // placeOrderHandler();
    // console.log(url);
  };

 
  const warrantyHandler = () => {
    // console.log(cart.cartItems[0].tokenURI);
    localStorage.setItem("tokenURI",cart.cartItems[0].tokenURI);
    history.push("/login?redirect=warranty");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {cart.shippingAddress.country}</p>
                <p>Pay method: {cart.paymentMethod}</p>
                {boolVal ? (
                      <div className=" p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          {/* Paid on {moment(order.paidAt).calendar()} */}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-success p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid
                        </p>
                      </div>
                    )}
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
                {boolVal ? (
                      <div className=" p-2 col-12">
                        {/* <p className="text-white text-center text-sm-start">
                          Delivered on {moment(order.deliveredAt).calendar()}
                        </p> */}
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Delivery in 3 days
                        </p>
                      </div>
                    )}
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={index}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>WARRANTY PERIOD</h4>
                      <h6>{item.warranty} years</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>SUBTOTAL</h4>
                      <h6>${item.qty * item.price}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>${cart.itemsPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>${cart.shippingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${cart.taxPrice}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>${cart.totalPrice}</td>
                </tr>
              </tbody>
            </table>
            { boolVal==true ?  cart.cartItems.length === 0 ? null : (
              <button className="war-submit" type="submit" onClick={()=> buyNFTHandler()}>
                PLACE ORDER
              </button>
            )
            // {error && (
            //   <div className="my-3 col-12">
            //     <Message variant="alert-danger">{error}</Message>
            //   </div>
            // )} 
            : 
            
            ( <>
            <h2  style={{"margin-right":"19px"}} >ORDER PLACED!!</h2>
            <button className="war-submit" style={ {"background-color": "#f06128"} } type="" onClick={warrantyHandler}>
            SEE WARRANTY DETAILS
            </button>
            </>)

            }
            

          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
