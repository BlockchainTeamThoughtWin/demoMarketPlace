import {React,useState} from 'react'
import Button from "react-bootstrap/Button";
import style from "../styles/metaMask.module.css";
import Modal from "react-bootstrap/Modal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../functions/connectors";
import { useRouter } from 'next/router'

export default function WalletConnectModal(props) {
  const router = useRouter();

    const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();
    const [network, setNetwork] = useState(undefined);
    const toHex = (num) => {
        const val = Number(num);
        return "0x" + val.toString(16);
      };

      async function refreshState() {
        window.localStorage.setItem("provider", undefined);
        setNetwork("");
      }
    

    async function setProvider(type) {
        window?.localStorage.setItem("provider", type);
      }
    async function handelNetwork(e) {
        const id = e.target.value;
        setNetwork(Number(id));
      }
      console.log(">>>", chainId);
    
      async function switchNetwork() {
        try {
          if (parseInt(props.currentChainId) != 5) {
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
        debugger
      props.currentChainId != toHex(5) && !active
        ? switchNetwork()
        : await activate(connectors.injected);
      setProvider("injected");
    } catch (ex) {
      console.log(ex);
    }
  router.push("Create")

  }

  async function disconnect() {
    try {
      deactivate();
      refreshState();
    } catch (ex) {
      console.log(ex);
    }
    router.push("/")
  }

  async function walletConnect() {
    activate(connectors.walletConnect, undefined, true).catch((error) => {
      
      activate(connectors.walletConnect);
    });
    router.push("/")
  }

  async function checkBalance() {
    balance = await provider.getBalance(
      "0x678fee76722fcDB047543fB7Fb92821e6E19F8db"
    );
    
  }

  return (
    <div>
           <Modal show={props.show} onHide={props.handleClose} className="metamask_button">
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
  )
}
