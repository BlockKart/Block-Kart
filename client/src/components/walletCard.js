import React, {useState} from 'react';
import {ethers} from 'ethers';
import { Link } from "react-router-dom";
import Abi from './../smart-contract/abi.json'

const WalletCard = ()=> {

    const [errorMessage,setErrorMessage] =useState(null);
    const [defAcc,setDefAcc]=useState(null);
    const [userBalance,setUserBalance] = useState(null);
    // const [connButtonText,setConnButtonText] = useSate('Connect Wallet');

    const connectWalletHandler =()=>{
        // if(window.ethereum){
        //     window.ethereum.request({method: 'eth_requestAccounts'})
        //     .then(result =>{
        //         accountChangeHandler(result[0]);
        //     })
        // }
        // else{
        //     setErrorMessage('Install Metamask');
        // }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    
    const erc20 = new ethers.Contract("0xbe3ccbfc866b16bd983b795b6ffa8c0f98b2540e", Abi, signer);
    erc20.on("Transfer", (from, to, amount, event) => {
        console.log("fghjk")
        console.log({ from, to, amount, event });
    });
    }

    const accountChangeHandler =(newAccount)=>{
        setDefAcc(newAccount);
        getUserBalance(newAccount);
    }

    const getUserBalance =(address)=> {
        window.ethereum.request({method: 'eth_getBalance', params:[ address,'latest' ]})
        .then(balance=>{
            setUserBalance(ethers.utils.formatEther(balance));
        })
    }

  return (
    <div >
    {/* <button onClick={connectWalletHandler}> {}Connect Wallet </button>  */}
    {/* <a href="https://th.bing.com/th/id/OIP.Yk9LuIWIVE3KMmpk6lzz0gHaHa?pid=ImgDet&rs=1"  onClick={connectWalletHandler} ></a> */}
    {/* <button><img src="./img/google.png" alt="my image" onClick={connectWalletHandler} /></button> */}
    <Link className="" to="/">
                    <img alt="logo" height="46px" width="46px" style={{"margin-bottom":"15px"}} src="/images/metamask.png" />
    </Link>

    {/* <p>acc: {defAcc }</p> */}
    {/* <p>userBalance: {userBalance}</p> */}
    </div>
  )
}

export default WalletCard