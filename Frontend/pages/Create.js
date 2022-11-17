import React, { useState, useEffect  } from "react";
import Navbar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import style from "../styles/create.module.css";
import Button from "react-bootstrap/Button";
import { CreateNFT } from "./api/apiCalls";
import { getNonce, CreateNonce} from "./api/apiCalls";



const Create = () => {
  useEffect(() => {
    Nonce();
  }, []);

  let currentNonce,  updatedNonce ;
  const Nonce =  async() => {
    
   currentNonce = await getNonce();
  debugger
  
  updatedNonce = currentNonce?.data[0].nonce +1;
  currentNonce =currentNonce?.data[0].nonce;
 query.nonce = updatedNonce;
 query.currentNonce = currentNonce;



 }
 
  const [query, setQuery] = useState({
    _name: "",
    Link: "",
    Description: "",
    Supply: "",
    BlockChain: "",
    token_id: "",
    owner_address:"",
  });
console.log(currentNonce?.data[0].nonce)
  // Update inputs value
  const handleParam = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery({ ...query, [name]: value });
  };
  // Form Submit function
  const formSubmit = async () => {
    debugger
    
    console.log("Data", query);
    const tokenId = 0;
    // query.nonce = increaseNonce;
    query.token_id = tokenId;
  
    await CreateNFT(query);
  };

  return (
    <>
      <Navbar />
      <div className={style.Create}>
        <h1>Create New Item</h1>
        <Form className={style.form}>
          <Form.Group>
            <Form.Label>
              <h3 className={style.Names}>Name</h3>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="_name"
              value={query._name}
              onChange={handleParam}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h3 className={style.Names}>External Link</h3>
            </Form.Label>
            <h6 className={style.names}>
              Yogi's MarketPlace will include a link to this URL on this item's
              detail page, so that users can click to learn more about it. You
              are welcome to link to your own webpage with more details.
            </h6>
            <Form.Control
              as="textarea"
              placeholder="https://yoursite.io/item/123"
              name="Link"
              value={query.Link}
              onChange={handleParam}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <h3 className={style.Names}>Description</h3>
            </Form.Label>
            <h6 className={style.names}>
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </h6>
            <Form.Control
              as="textarea"
              placeholder="Provide Detailed Discription of Your Item"
              rows={4}
              name="Description"
              value={query.Description}
              onChange={handleParam}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <h3 className={style.Names}>Supply</h3>
            </Form.Label>
            <h6 className={style.names}>
              The number of items that can be minted. No gas cost to you!
            </h6>
            <Form.Control as="textarea" placeholder="Total Supply " />
          </Form.Group>

          <Form.Group>
            <div>
              <h1 className={style.Names}>BlockChian</h1>
              <select className={style.chain}>
                <option value="female">Ethereum</option>
                <option value="female">Arbitrum</option>
                <option value="male">Avalanche</option>
                <option value="other">Klaytn</option>
                <option value="other">Polygon</option>
                <option value="other">Solana</option>
              </select>
            </div>
          </Form.Group>
          <Button className={style.primary} onClick={formSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Create;
