import React from "react";
import axios from "axios";

export const getNFt = async () => {
  const response = await axios.get("http://localhost:8000/nftdetails/");
  return response;
};

export const CreateNFT = async (query) => {
  debugger;
  console.log("form Data", query);

  axios({
    url: "http://localhost:8000/nftdetails",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: query,
  })
    .then((res) => {
      res.json();
      console.log("Data----------", res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getNonce = async () =>{
  const res  = await axios.get("http://localhost:8000/nonce");
  return res;
}
