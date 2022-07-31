import React,{useState,useEffect} from "react";
import ModHeader from "./modHeader";

function WarrantyCard() {
    const [nftData, setNftData] = useState(null);
    const [imgLink, setImgLink] = useState("");
    const [name, setName]= useState("");
    const [tokenId, setTokenId] = useState(0);
    const [warranty, setWarranty] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [serial, setSerial] = useState("");
    const [warrLeft,setWarrLeft ]= useState(null);



    
    
    useEffect(() => {
      async function fetchData() {
        const tokenURI = localStorage.getItem("tokenURI");
        const response = await fetch(
          tokenURI
        );
        if (!response.ok) throw new Error(response.statusText);
  
        const json = await response.json();
        // console.log(json);
        setNftData(json);
      }
      fetchData();
    }, []);

    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='image')
                    setImgLink(element.value);
            })}
    })
    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='name')
                    setName(element.value);
            })}
    })
    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='tokenId')
                    setTokenId(element.value);
            })}
    })
    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='price')
                    setPrice(element.value);
            })}
    })
    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='description')
                    setDescription(element.value);
            })}
    })
    useEffect(()=>{
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='serial')
                    setSerial(element.value);
            })}
    })
    useEffect(()=>{
        let x= new Date().toLocaleDateString(),y;
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='createdTime')
                    x= element.value;
                if(element.trait_type=='warranty')
                    y= element.value;
            })}

            let sp= x.split('/');
            let xx= sp[1]+'/'+sp[0]+'/'+sp[2];
            let d1= new Date(xx);
            let d2= new Date().toLocaleDateString();
            let d3= new Date(d2);

            let Difference_In_Time = d3.getTime() - d1.getTime();

            let days = Difference_In_Time / (1000 * 3600 * 24);
            let warrdays= y*365;
            let daysleft = warrdays - days;
            setWarrLeft(calculateTimimg(daysleft));

    })
    const calculateTimimg = d => {
      let months = 0, years = 0, days = 0, weeks = 0;
      while(d){
         if(d >= 365){
            years++;
            d -= 365;
         }else if(d >= 30){
            months++;
            d -= 30;
         }else if(d >= 7){
            weeks++;
            d -= 7;
         }else{
            days++;
            d--;
         }
      };
      return {
         years, months, weeks, days
      };
   };
    useEffect(()=>{
        
        if(nftData!=null) {
            nftData.attributes.map((element) => {
                if(element.trait_type=='warranty')
                    setWarranty(element.value);
            })}
    })
    
    


  return (
    <div className="war-body">
      <ModHeader />
      <>
  <div className="war-card">
    <div className="war-thumbnail">
      <img
        className="left"
        src={imgLink}
      />
    </div>
    <div className="right">
      <h1 className="war-h1">ONLINE WARRANTY CARD</h1>
      <div className="separator" />
      {nftData ? (
        <table class="table table-striped">
          {/* {nftData.attributes.map((element) => {
              if(element.trait_type!='image')
            // console.log(element);
            return (
              <tr>
                <th>{element.trait_type}</th>
                <td>{element.value}</td>
              </tr>
            );
          })} */}
          <tr>
                <th>Product Name</th>
                <td>{name}</td>
            </tr>
            <tr>
                <th>Product Price</th>
                <td>{price}</td>
            </tr>
          <tr>
                <th>NFT ID</th>
                <td>{tokenId}</td>
            </tr>
            <tr>
                <th>Warranty Period</th>
                <td>{warranty} years</td>
            </tr>
          <tr>
                <th>Product Desc</th>
                <td>{description}</td>
            </tr>
            <tr>
                <th>Product Serial No.</th>
                <td>{serial}</td>
            </tr>
            <tr>
                <th>Warranty Left</th>
                <td>{warrLeft.years} years {warrLeft.months} months</td>
            </tr>
        </table>
      ) : (
        <h3>Loading</h3>
      )}
      <p className="war-p">
        Other details are available in the invoice send to your mail.

      </p>
    </div>
    <h5 className="war-h5">{new Date().getDate()}</h5>
    <h6 className="war-h6">{new Date().toLocaleString('default', { month: 'long' })}</h6>
    <div className="war-fab">
      <i className="fa fa-arrow-down fa-3x"> </i>
    </div>
  </div>
</>







      {/* <div className="war-container">
        <div className="war-img">
          <img src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
        </div>
        <div className="war-detail">
          <p>Women's Running Shoe</p>
          <h1>Nike Epic React Flyknit</h1>
          <h2>$150</h2>
          <p className="war-desc">
            The Nike Epic React Flyknit foam cushioning is responsive yet
            light-weight, durable yet soft. This creates a sensation that not
            only enhances the feeling of moving forward, but makes running feel
            fun, too.
          </p>
          <div className="buttons">
            <button className="add">Add to Cart</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default WarrantyCard;
