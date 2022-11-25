import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../styles/Navbar.module.css";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import Button from "react-bootstrap/Button";
import { connectors } from "../functions/connectors";
import { useWeb3React } from "@web3-react/core";

import { useState, useEffect } from "react";

import WalletConnectModal from "./WalletConnectModal";

function WalletNav() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentChainId, setCurrentChainId] = useState();



  const { activate } =
    useWeb3React();



  useEffect(() => {
    if (typeof window !== "undefined" && !!window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      setCurrentChainId(window?.ethereum.chainId);
    }
  });



  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  return (
    <Navbar className={styles.NavbarColor} expand="lg">
      <Container fluid>

        <Button className={styles.IconWallet} onClick={handleShow} >
          <span>
            <Image
              src="/wallet.png"
              width="30px"
              height="30"
              className={styles.IconWallet}
            ></Image>
          </span>
        </Button>
        <WalletConnectModal show={show} handleClose={handleClose} currentChainId={currentChainId} />


      </Container>
    </Navbar>
  );
}

export default WalletNav;
