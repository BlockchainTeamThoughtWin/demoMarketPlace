import React, { useState, useEffect  } from "react";
import Navbar from "../../components/Navbar";
import Form from "react-bootstrap/Form";
import style from "../../styles/create.module.css";
import Button from "react-bootstrap/Button";
import { CreateNFT } from "../api/apiCalls";
import { getNonce, UpdateNonce} from "../api/apiCalls";




const Create = () => {
 
  let currentNonce,  updatedNonce ;
 
  const [query, setQuery] = useState({
    _name: "",
    Link: "",
    Description: "",
    Supply: "",
    BlockChain: "",
    token_id: "",
    owner_address:"",
    nonce: "",
    currentNonce: "",
  });
 
  const [imageUrl , setImageUrl] = useState('');


  function getBase64(e) {
    // debugger
    var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
  
    setImageUrl(window.URL.createObjectURL(file))

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
  }

  const handleParam = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery({ ...query, [name]: value });
  };
  // Form Submit function
  const formSubmit = async () => {
    const a = await getNonce();

   if(a.data[0]?.nonce==undefined){
    currentNonce=0
   }else{

     console.log(a.data[0]?.nonce);
     currentNonce = a.data[0]?.nonce;
   }



    const tokenId = 0;
    query.currentNonce = currentNonce;
    query.nonce = currentNonce+1;

    query.token_id = tokenId;
  
    await CreateNFT(query);
   
  };

  return (
    <>
      <Navbar />
      <div className={style.Create}>
        <h1>Create New Item</h1>
       
<div >
      <div className={style.item}>
        <img width={"600px"} src={imageUrl} className={style.NFTImage} />
      </div>
      <label for='dvd_image'>NFT Image: </label>
      <input type="file" id="dvd_image" name="imgUpload" value="" onChange={getBase64} />
    </div>



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
              <h1 className={style.Names}>BlockChain</h1>
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
