import React, { useEffect, useState } from "react";
import axios from "axios";
import ModHeader from "./../modHeader";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Abi from "./../../smart-contract/abi.json";

function SellNFT() {
  const [fullProduct, setFullProduct] = useState([]);
  useEffect(async () => {
    let prodObj = await listP();

    setFullProduct(
      prodObj.map((p) => p),
      []
    );
  }, []);

  const listP = async (e) => {
    console.log("sdfghjkl");
    const { data } = await axios.get(`/api/products/`);

    // console.log(data);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const erc20 = new ethers.Contract(
      "0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e",
      Abi,
      signer
    );

    const tokenAdd = "0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e";
    const prodObj = new Array();

    for (let i = 0; i < data.products.length; i++) {
      let add = await erc20.ownerOf(data.products[i].tokenId +1);
      // console.log("addre of token ",data.products[i].tokenId+1 ,  add);   //printing addr with tokenid

      if (add.toLowerCase() == tokenAdd.toLowerCase()) {
        prodObj.push(data.products[i]);
      }
    }

    // console.log(prodObj);
    return prodObj;
  };

  return (
    <>
      <ModHeader />
      <h2 className="container d-flex flex-column justify-content-center align-items-center ">
        My Product for Sale
      </h2>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row ">

                {fullProduct.length==0? <div className="spinner-border animate-spin m-auto rounded-full flex justify-center text-blue-600 "> </div>   :  fullProduct.map((product) => (
                  <div
                    className="shop col-lg-4 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={product.image} alt={product.name} />
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>
                        <div className="detail-list">
                          <span className="">${product.price}</span>
                          {/* <span>Token Id: {product.tokenId}</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellNFT;
