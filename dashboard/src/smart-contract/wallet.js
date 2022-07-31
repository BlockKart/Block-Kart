import React, {useState} from 'react';
import {ethers} from 'ethers';

const Wallet = ()=> {

    const [errorMessage,setErrorMessage] =useState(null);
    const [defAcc,setDefAcc]=useState(null);
    const [userBalance,setUserBalance] = useState(null);
    // const [connButtonText,setConnButtonText] = useSate('Connect Wallet');

    const connectWalletHandler =()=>{
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result =>{
                accountChangeHandler(result[0]);
            })
        }
        else{
            setErrorMessage('Install Metamask');
        }
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
    {/* <button onClick={connectWalletHandler}> {}btn </button>  */}
    {/* <p>default acc: {defAcc}</p>
    <p>userBalance: {userBalance}</p> */}
    </div>
  )
}

export default Wallet