import React, { useEffect, useState } from "react";
import styles from "../../styles/tabsPage.module.css";
import style from "../../styles/Cardslide.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { createdNFT } from "../api/apiCalls";
import Card from "react-bootstrap/Card";
import { useWeb3React } from "@web3-react/core";

const Collected = () => {
  const [data, setData] = useState([]);
  const { account } = useWeb3React();

  useEffect(() => {
    getNFTs();
  }, []);

  const getNFTs = async () => {
    const result = await createdNFT();
    const response = result.data;
    console.log("NFT: ", response);
    setData(response);
  };

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {/* <p>{ account }</p> */}
      {/* <p>{ account.balance }</p> */}

      {data?.map((item) => (
        <>
          {account == item.owner_address ? (
            <>
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={item?.Imguri} />
                  <Card.Body>
                    <Card.Title>{item?._name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ) : null}
        </>
      ))}
    </div>
  );
};

export default Collected;
