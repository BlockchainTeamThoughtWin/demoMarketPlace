import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Form from "react-bootstrap/Form";
import style from "../../styles/create.module.css";
import Button from "react-bootstrap/Button";
import { CreateNFT } from "../api/apiCalls";
import { getNonce, UpdateNonce } from "../api/apiCalls";
import axios from "axios";

const Create = () => {
  let currentNonce, updatedNonce;

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
  });

  const [imageUrl, setImageUrl] = useState("");


 const getBase64 = async (e)  => {
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

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
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
  // Form Submit function
  const formSubmit = async () => {
    const a = await getNonce();

    if (a.data[0]?.nonce == undefined) {
      currentNonce = 0;
    } else {
      console.log(a.data[0]?.nonce);
      currentNonce = a.data[0]?.nonce;
    }

    const tokenId = 0;
    query.currentNonce = currentNonce;
    query.nonce = currentNonce + 1;

    query.token_id = tokenId;

    await CreateNFT(query);
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
