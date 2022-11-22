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
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import style from "../styles/metaMask.module.css";

function NavScrollExample() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentChainId, setCurrentChainId] = useState();
  const [network, setNetwork] = useState(undefined);

  const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();

  const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !!window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      setCurrentChainId(window?.ethereum.chainId);
    }
  });
  console.log("chainId: ", currentChainId);

  async function refreshState() {
    window.localStorage.setItem("provider", undefined);
    setNetwork("");
  }

  async function handelNetwork(e) {
    const id = e.target.value;
    setNetwork(Number(id));
  }
  console.log(">>>", chainId);

  async function switchNetwork() {
    try {
      if (parseInt(currentChainId) != 5) {
        window?.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(5) }],
        });
        await activate(connectors.injected);
      } else {
        debugger;
        await library?.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(5) }],
        });
      }
    } catch (error) {}
  }

  async function connect() {
    try {
      currentChainId != toHex(5) && !active
        ? switchNetwork()
        : await activate(connectors.injected);
      setProvider("injected");
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      refreshState();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function walletConnect() {
    activate(connectors.walletConnect, undefined, true).catch((error) => {
      // if (error instanceof UnsupportedChainIdError) {
      activate(connectors.walletConnect);
      // } else {
      //   console.log("Pending Error Occured");
      // }
    });
  }

  async function checkBalance() {
    balance = await provider.getBalance(
      "0x678fee76722fcDB047543fB7Fb92821e6E19F8db"
    );
    console.log(ethers.utils.formatEther(balance));
  }
  // checkBalance();

  async function setProvider(type) {
    window?.localStorage.setItem("provider", type);
  }

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  return (
    <Navbar className={styles.NavbarColor} expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <a>
              <Image
                className={styles.logoplace}
                src="/yogi.png"
                width="40px"
              ></Image>
            </a>
          </Link>
          <Link href="/">
            <a className={styles.Yogi}>Yogi's Marketplace</a>
          </Link>
        </Navbar.Brand>
        <input
          type="search"
          id="gsearch"
          name="gsearch"
          placeholder="Search items, Collections & Accounts"
          className={styles.Search}
        />
        <Image className={styles.searchicon} src="searchIcon.png"></Image>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className={styles.NavBarLine}>
          <Nav navbarScroll>
            <Nav.Link className={styles.Home} href="/">
              Home
            </Nav.Link>

            <Nav.Link className={styles.Create} href="Create">
              Create
            </Nav.Link>
            <Link href="/Profile">
              <a>
                <Image
                  src="/user.png"
                  width="30px"
                  height="30"
                  className={styles.IconProfile}
                ></Image>
              </a>
            </Link>
            {/* <Link href="/WalletConnection">

                <Image
                  src="/wallet.png" 
                  width="30px"
                  height="30"
                  className={styles.IconWallet}
                ></Image>
              
            </Link> */}

            <Button className={styles.IconWallet} onClick={handleShow}>
              <span>
                <Image
                  src="/wallet.png"
                  width="30px"
                  height="30"
                  className={styles.IconWallet}
                ></Image>
              </span>
            </Button>

            <Modal show={show} onHide={handleClose} className="metamask_button">
              <Modal.Header closeButton>
                <Modal.Title>
                  <div className="mx-auto" style={{ width: "200" }}>
                    Connect Wallet
                  </div>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button variant="white" onClick={connect}>
                  <p>
                    <span>
                      <img src="images/metamask.svg" width="25" height="25" />
                    </span>

                    <b className={style.Metamask}>Connect To MetaMask</b>
                  </p>
                </Button>
                {active ? (
                  <span>
                    <b> {account} </b>
                  </span>
                ) : (
                  <span> </span>
                )}
                <br></br>

                <Button variant="white" onClick={disconnect}>
                  <p>
                    <span>
                      <img src="images/disconnect.png" width="30" height="30" />
                    </span>

                    <b className={style.Metamask}>Disconnect</b>
                  </p>
                </Button>

                <br></br>

                <Button variant="white" onClick={walletConnect}>
                  <p>
                    <span>
                      <img src="images/download.png" width="30" height="30" />
                    </span>

                    <b className={style.Metamask}> Connect To WalletConnect</b>
                  </p>
                </Button>
              </Modal.Body>
            </Modal>
          </Nav>
        </Navbar.Collapse>
        {/* <Button variant="white">Connect</Button> */}
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
