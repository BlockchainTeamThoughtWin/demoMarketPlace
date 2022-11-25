import React from "react";
import axios from "axios";

export const getNFt = async () => {
  const response = await axios.get("http://localhost:8000/nftdetails/");
  return response;
};

export const CreateNFT = async (query) => {
  console.log("form Data", query);

  axios({
    url: "http://localhost:8000/nftdetails",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: query,
  })
    .then((res) => res.json)
    .catch((err) => {
      console.log(err);
    });
};

export const getNonce = async () => {
  const res=  await axios.get("http://localhost:8000/nonce");
    return res;
}

export const CreateNonce = async (nonce) => {
  // console.log("form Data", query);
  debugger

  axios({
    url: "http://localhost:8000/nonce",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: nonce,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
};

export const UpdateNonce = async (nonce) =>{
  await axios.put(`http://localhost:8000/nonce/${nonce}`);
}

export const createdNFT = async() => {
  const resp =  await axios.get("http://localhost:8000/nftdetails/");
  return resp;
}