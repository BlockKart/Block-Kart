import React, { useEffect, useState } from "react";
import axios from "axios";
import ModHeader from "./../modHeader";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import Abi from "./../../smart-contract/abi.json";

function OwnNFT() {
  const [ownProduct, setOwnProduct] = useState([]);
  const [fullProduct, setFullProduct] = useState([]);
  const [token, setToken] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(`/api/products/`);

    let prodObj = await listP();
    if(prodObj.length==0) return
    setFullProduct(
      prodObj.map((p) => p),
      []
    );
  }, []);

  // useEffect( async() =>{
  //   const { data } = await axios.get(`/api/products/`)

  //   let prodObj= await listP();

  //   setOwnProduct(prodObj.map(p=>p.name),[])
  // }, [] )

  //   useEffect( async() =>{
  //     const { data } = await axios.get(`/api/products/`)

  //     let prodObj= await listP();

  //     setToken(prodObj.map(p=>p.tokenId),[])
  // }, [] )

  const listP = async (e) => {
    const { data } = await axios.get(`/api/products/`);

    // console.log(data);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const erc20 = new ethers.Contract(
      "0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e",
      Abi,
      signer
    );

    const wallAdd = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const prodObj = new Array();

    // console.log("wallet add ", wallAdd);
    for (let i = 0; i < data.products.length; i++) {
      let add = await erc20.ownerOf(data.products[i].tokenId +1);

      // console.log("addre of token ",data.products[i].tokenId);   //printing addr with tokenid

      if (add.toLowerCase() == wallAdd[0].toLowerCase()) {
        prodObj.push(data.products[i]);
      }
    }

    // console.log(prodObj);
    return prodObj;
  };

  const sellnft = async (price, tokenId,e) => {
    // console.log(price);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    
    const erc20 = new ethers.Contract("0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e", Abi, signer);

    await erc20.listNFT(tokenId+1,price);    

  };

  const showWarranty = async( tokenURI, e)=>{
    localStorage.setItem("tokenURI",tokenURI);
    window.open("http://localhost:3000/warranty","_self")
  }

  return (
    <>
      <ModHeader />
      <h2 className="container d-flex flex-column justify-content-center align-items-center ">
        My Orders{" "}
      </h2>

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row justify-center">
                {/* <div className="spinner-grow rounded-full opacity-0" role="status">
                  //for loading 
                  </div> */}

                {fullProduct.length==0? <div className="spinner-border animate-spin m-auto rounded-full flex justify-center text-blue-600 "> </div>  : fullProduct.map((product) => (
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

                      <div className="shoptext ">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </p>
                        <div className="detail-list">
                          <span className="">${product.price}</span>
                          <span>
                          <button onClick={ ()=> showWarranty(product.tokenURI)}>Warranty Card</button>
                          </span>
                          <span>
                            <button onClick={ ()=> sellnft(product.price, product.tokenId)}>Sell NFT</button>
                          </span>
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

export default OwnNFT;
