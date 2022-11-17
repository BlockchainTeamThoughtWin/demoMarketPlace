import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { getNFt } from "../pages/api/apiCalls.js";
import React from "react";
import axios from "axios";

// export default () => {
//   const callNFts = async () => {
//     const res = await getNFt();
//     console.log("data is ", res.data);
//   };

//   useEffect(() => {
//     callNFts();
//   }, []);
//   return (
//     <div>
//       <div>
//         <h1>Trending</h1>
//       </div>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th></th>
//             <th>COLLECTION</th>
//             <th>Floor Price</th>
//             <th>Volume</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Demo NFT</td>
//             <td>0.33 ETH</td>
//             <td>500 ETH</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>Demo NFT</td>
//             <td>0.33 ETH</td>
//             <td>500 ETH</td>
//           </tr>
//           <tr>
//             <td>3</td>
//             <td>Demo NFT</td>
//             <td>0.33 ETH</td>
//             <td>500 ETH</td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// };


const HomeTable = () => {
  const callNFts = async () => {
        const res = await getNFt();
        console.log("data is ", res.data);
      };
    
      useEffect(() => {
        callNFts();
      }, []);
  return (
    <div>
      List of Post
    </div>
  )
}

export default HomeTable