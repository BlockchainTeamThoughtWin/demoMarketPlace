import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Form from "react-bootstrap/Form";
import style from "../../styles/create.module.css";
import Button from "react-bootstrap/Button";
import { CreateNFT } from "../api/apiCalls";
import { getNonce, UpdateNonce } from "../api/apiCalls";
import axios from "axios";
import { useRouter } from 'next/router'
import Web3 from 'web3';
import { useWeb3React } from "@web3-react/core";
import { Sign } from "../../components/utils";
// require('dotenv').config()


const Create = () => {
  
 
   
  const { active, chainId, account, library, connector, activate, deactivate } =
    useWeb3React();

    console.log(library)
    

  const router = useRouter();
  let currentNonce, updatedNonce;

  const getInitialState = () => {
    const value = "Ethereum";
    return value;
  };

  const [value, setValue] = useState(getInitialState);



  const [query, setQuery] = useState({
    _name: "",
    Link: "",
    Description: "",
    Supply: "",
    BlockChain: "",
    token_id: "",
    owner_address: "",
    nonce: "",
    currentNonce: "",
    Imguri: "",
    TokenURI: "",
  });

  const [formError, setFromError] = useState({});

  const [imageUrl, setImageUrl] = useState("");
  const [isSubmit, setIsSubmit] = useState(true);

  useEffect(()=>{
    console.log(formError);
   if(Object.keys(formError).length === 0 && isSubmit){
    console.log(query);
   }
   },[formError])

  const getBase64 = async (e) => {
    // debugger
    var file = e.target.files[0];

    // initialize the form data
    const formData = new FormData();
    formData.append("file", file);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        'pinata_api_key': "d0d1a9de90159925f8b6",
        'pinata_secret_api_key': "5d2855c8207865cbd91adfee33c52283128121055e7b812013aac7103b135135",
        "Content-Type": "multipart/form-data"
      },
    });

    const ImgHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
    //http://127.0.0.1:8080/ipfs/QmXgTxeCpuL44iyGmav2k6WJ1YFACm1224fuoZ4CLFYERR
    console.log(ImgHash);
    query.Imguri = ImgHash;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(window.URL.createObjectURL(file));
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };

  }


  const handleParam = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery({ ...query, [name]: value });
  };

  const validate = (query) => {
  const error = {};
  if(!query.name){
    error._name = "Name is Required!"
    setIsSubmit(false);
  }

  if(!query.Supply){
    error.Supply = "Supply is Required!"
    setIsSubmit(false);
  }

  if(!query.BlockChain){
    error.BlockChain = "Select the BlockChain!"
    setIsSubmit(false);
  }
   
return error;

  }
  // Form Submit function
  const formSubmit = async () => {
    if (isSubmit == true) {
      
    
    const GetNonce = await getNonce();

    if (GetNonce.data[0]?.nonce == undefined) {
      currentNonce = 0;
    } else {
      console.log(GetNonce.data[0]?.nonce);
      currentNonce = GetNonce.data[0]?.nonce;
    }




    const tokenId = 0;
    query.currentNonce = currentNonce;
    
    query.nonce = currentNonce + 1;

    query.token_id = tokenId;

    query.owner_address = account;

    const _json = new File([JSON.stringify(query)], 'metadata.json');
    console.log("JSON File is", _json);

    console.log("qwery", query);

    const fData = new FormData()
    fData.append("file", _json);
  const  url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    const response = await axios.post(
      url,
      fData,
      {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${query._boundary}`,
          'pinata_api_key': "d0d1a9de90159925f8b6",
          'pinata_secret_api_key': "5d2855c8207865cbd91adfee33c52283128121055e7b812013aac7103b135135",

        }
      }
    )
    const Token_URI = response.data.IpfsHash;
    query.TokenURI =  Token_URI;
    // const ERC721 = "0x10E457129b4F5F35EdaC901AC669333a887C1513"
    // const ERC20 = "0x12A98122E956Bbf3535523Ac9A2C178E3E2af325"
    // const Signature = await Sign(ERC721, query.token_id, query.TokenURI, ERC20,500, query.nonce,account,library?.givenProvider )
    // console.log("the signature is ",Signature);

    setFromError(validate(query))
    setIsSubmit(true);

    await CreateNFT(query);

    
    // router.push("/")
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.Create}>
        <h1>Create New Item</h1>

        <div>
          <div className={style.item}>
            <img width={"600px"} src={imageUrl} className={style.NFTImage} />
          </div>
          <Form.Label>NFT Image: </Form.Label>
          <input type="file" name="Imguri" onChange={getBase64} />
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
          
          <p className={style.error}> {formError._name}</p>
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
              type="text"
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
              type="text"
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
            <Form.Control
              type="number"
              placeholder="Total Supply"
              name="Supply"
              value={query.Supply}
              onChange={handleParam}
            />
          </Form.Group>
          <p className={style.error} > {formError.Supply}</p>
          <Form.Group>
            <div>
              <h1 className={style.Names}>BlockChain</h1>

              <select name="BlockChain" value={query.BlockChain} onChange={handleParam} className={style.chain}>
                <option value="" selected>Select the BlockChain</option>
                <option value="Ethereum" >Ethereum</option>
                <option value="Polygon">Polygon</option>

              </select>


            </div>
          </Form.Group>
          <p className={style.error}> {formError.BlockChain}</p>

          <Button className={style.primary} onClick={formSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Create;
