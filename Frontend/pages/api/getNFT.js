import React from "react";
import axios from "axios";

export const getNFt = async () => {
  const response = await axios.get("http://localhost:8000/nftdetails/");
  return response;
};
