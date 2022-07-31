import React,{useState} from "react";
import Abi from "./abi.json";
import {ethers} from 'ethers'

function Nft() {
  const [contractListened, setContractListened] = useState();
  


//   useEffect(() => {
//     if (contractInfo.address !== "-") {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const erc20 = new ethers.Contract(
//         contractInfo.address,
//         Abi,
//         provider
//       );

//       erc20.on("Transfer", (from, to, amount, event) => {
//         console.log({ from, to, amount, event });

//         setTxs((currentTxs) => [
//           ...currentTxs,
//           {
//             txHash: event.transactionHash,
//             from,
//             to,
//             amount: String(amount),
//           },
//         ]);
//       });
//       setContractListened(erc20);

//       return () => {
//         contractListened.removeAllListeners();
//       };
//     }
//   }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract("0xc71a03e0967f6771e7a8e68ff40e900de2fb9c50", Abi, provider);

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    console.log(tokenName,tokenSymbol,totalSupply);
    
  };

  const handleMint = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(provider);

    const signer = provider.getSigner();
    // console.log(signer);
    
    const erc20 = new ethers.Contract("0xc71a03e0967f6771e7a8e68ff40e900de2fb9c50", Abi, signer);

    const tokenName = await erc20.name();

    // await erc20.safeMint("0x730BbeF40861Dca35a27aFF0a3C7Bef354bD2f77"); //wallet adress

    console.log(tokenName);
    const ow1= await erc20.totalSupply();
    console.log(ow1);

    // await erc20.safeTransferFrom("0x730BbeF40861Dca35a27aFF0a3C7Bef354bD2f77", "0xc122029d7E66C95C5fA7eBcE395F72FaF95a4AE7" ,0);
    // await erc20["safeTransferFrom(address,address,uint256)"]("0x730BbeF40861Dca35a27aFF0a3C7Bef354bD2f77","0xc122029d7E66C95C5fA7eBcE395F72FaF95a4AE7",1);
    console.log("transfered");
  };
  return( 
  <div>
        {/* <button onClick={handleSubmit}>Buton</button>
        <button onClick={handleMint}>Mint</button> */}
  </div>
  );
}

// export function handleMint();

// export {handleMint as handleMint};
export default Nft;