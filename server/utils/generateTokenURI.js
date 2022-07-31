import axios from "axios";

const pinJSONToPinata = async ({
  name,
  tokenId,
  price,
  warranty,
  description,
  image,
  serial,
  createdTime,
  countInStock,
  
}) => {
  const keys = {
    name,
    tokenId,
    price,
    warranty,
    description,
    image,
    createdTime,
    countInStock,
    serial,
  };
  try {
    var details = {
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: "testing",
        keyvalues: {},
      },
      pinataContent: {
        name: "Product Information",
        attributes: [{ trait_type: "Title", value: "Warranty Information" }],
      },
    };

    for (var key in keys) {
      details.pinataContent.attributes.push({
        trait_type: key,
        value: keys[key],
      });
    }
    var data = JSON.stringify(details);

    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyZDhhYTdiMS05MzVmLTQxMDItOWEzNi05OGI1MTBmYjU2YjIiLCJlbWFpbCI6InByczE2MDEyMDA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNmJkZTMxODVmMzdjOThjOGNlNSIsInNjb3BlZEtleVNlY3JldCI6IjRlMjE0MWNiMzI1ZDBiNWYwNDE5Y2M5OWYxMTkwYzBkNDhkMDI5NDQ1ZWZlMmY4ZGVmYmFjOTA4YTExZmE5YWQiLCJpYXQiOjE2NTg2ODYyMTR9.Yi71oMv77dj0BlDNZ8mWBZjRbrHcavqaHv1rmKhBf_I",
      },
      data: data,
    };

    const res = await axios(config);

    return res.data.IpfsHash;
  } catch (err) {
    console.log(err);
  }
};

export default pinJSONToPinata;
