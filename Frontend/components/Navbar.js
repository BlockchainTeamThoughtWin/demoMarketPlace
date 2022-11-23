import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/Navbar.module.css";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import React from "react";
import WalletNav from "../components/WalletNavbar"
import { useWeb3React } from "@web3-react/core";
import { Button } from "react-bootstrap";

import { connectors } from "../functions/connectors";


import { useState, useEffect } from "react";

import WalletConnectModal from "./WalletConnectModal";
import { useRouter } from "next/router";


function NavScrollExample() {
  
const {account} = useWeb3React();
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);

const router = useRouter();

const handleCreateFrom= ()=>{
 setShow(true);
 router.push("/")
}
const [currentChainId, setCurrentChainId] = useState();
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
            {account? <Nav.Link className={styles.Create} href="Create" >
              Create

              </Nav.Link>:  <Nav.Link className={styles.Create} onClick={handleCreateFrom} >
              Create

              </Nav.Link>
       }
              {/* <>
              {
                account != undefined ? <Nav.Link className={styles.Create} href="Create" >
                Create
              </Nav.Link> : <a className={styles.Create} onClick={WalletNav} >
              Connect
            </a>
              }
              </> */}
            {/* {account != undefined ? 
            <Nav.Link className={styles.Create} href="Create" >
              Create
            </Nav.Link> : <button>CreateNFT</button>
            } */}
{/* 
<Nav.Link className={styles.Create} href="Create" >
              Create
            </Nav.Link> */}
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
           
<WalletNav/>
        
          </Nav>
        </Navbar.Collapse>

      </Container>
      <WalletConnectModal  show ={show} handleClose={handleClose} currentChainId={currentChainId}/>
    </Navbar>
  );
}

export default NavScrollExample;
