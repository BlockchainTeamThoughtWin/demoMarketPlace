import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
  <Web3ReactProvider getLibrary={getLibrary}>
  <Component {...pageProps} />
  </Web3ReactProvider>
  );
}


export default MyApp;

// import "../styles/globals.css";
// import Script from "next/script";
// import Head from "next/head";
// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Head>
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//           integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
//           crossOrigin="anonymous"
//         />
//       </Head>
//       <Script
//         id="bootstrap-cdn"
//         src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
//       />
//       <Component {...pageProps} />
//     </>
//   );
// }
// export default MyApp;