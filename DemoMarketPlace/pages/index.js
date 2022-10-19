import { useWeb3React } from "@web3-react/core";
import { useState, useEffect } from "react";
import ErrorMessage from "./errorMessage";
// import ChangeNetwork  from "./changeNetwork";
import { injected } from "../components/wallet/connectors";

const networks = {
  polygon: {
    chainId: "0x80001",
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  bcs: {
    chainId: "0x97",
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://data-seed-prebsc-2-s1.binance.org:8545/",
      "http://data-seed-prebsc-2-s2.binance.org:8545/",
      "https://rpc.ankr.com/bsc_testnet_chapel",
    ],
    blockExplorerUrls: ["https://explorer.binance.org/smart-testnet"],
  },
};

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (err) {
    setError(err.message);
  }
};

export default function Home() {
  const [error, setError] = useState();
  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
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

  return (
    <div className="flexflex-col items-center justify-center">
      <button
        onClick={connect}
        className="py-2 nt-20 mb-4 text-lg font-bold text-white rounded-lg w-s6 bg-blue-600 hover:bg-blue-800"
      >
        Connect To MetaMask
      </button>
      {active ? (
        <span>
          Connected with <b> {account} </b>
        </span>
      ) : (
        <span>Not Conneted</span>
      )}

      <button
        onClick={disconnect}
        className="py-2 nt-20 mb-4 text-lg font-bold text-white rounded-lg w-s6 bg-blue-600 hover:bg-blue-800"
      >
        Disconnect
      </button>
      <h1 className="text-xl font-semibold text-gray-700 text-center">
        Force MetaMask network
      </h1>

      <div className="mt-4">
        <button
          onClick={() => handleNetworkSwitch("polygon")}
          className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
        >
          Switch to Polygon
        </button>
        <button
          onClick={() => handleNetworkSwitch("bsc")}
          className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
        >
          Switch to BSC
        </button>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
}