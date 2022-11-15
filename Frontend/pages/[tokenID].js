import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const tokenID = () => {
  const router = useRouter();
  const tokenID = router.query.tokenID;
  return (
    <>
      <Navbar />
      <div>Token ID is {tokenID}</div>
    </>
  );
};

export default tokenID;
