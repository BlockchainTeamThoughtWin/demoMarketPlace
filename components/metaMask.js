import React from "react";
import Button from "react-bootstrap/Button";
import { connectors } from "functions/connectors.js";
import { useWeb3React } from "@web3-react/core";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Favicon from "react-favicon";
import style from "../styles/metaMask.module.css";

function WalletConnection() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(connectors.injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function walletConnect() {
    activate(connectors.walletConnect, undefined, true).catch((error) => {
      if (error instanceof UnsupportedChainIdError) {
        activate(connectors.walletConnect);
      } else {
        console.log("Pending Error Occured");
      }
    });
  }

  return (
    // <div className="flexflex-col items-center justify-center">
    //   <button
    //     onClick={connect}
    //     className="py-2 nt-20 mb-4 text-lg font-bold text-white rounded-lg w-s6 bg-blue-600 hover:bg-blue-800"
    //   >
    //     Connect To MetaMask
    //   </button>
    //   {active ? (
    //     <span>
    //       Connected with <b> {account} </b>
    //     </span>
    //   ) : (
    //     <span>Not Conneted</span>
    //   )}

    //   <button
    //     onClick={disconnect}
    //     className="py-2 nt-20 mb-4 text-lg font-bold text-white rounded-lg w-s6 bg-blue-600 hover:bg-blue-800"
    //   >
    //     Disconnect
    //   </button>
    //   <button onClick={walletConnect}
    //   className="py-2 nt-20 mb-4 text-lg font-bold text-white rounded-lg w-s6 bg-blue-600 hover:bg-blue-800">
    //     Connect To WalletConnect
    //     </button>
    <div>
      <Button variant="primary" onClick={handleShow}>
        Create
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
    </div>
  );
}
export default WalletConnection;
