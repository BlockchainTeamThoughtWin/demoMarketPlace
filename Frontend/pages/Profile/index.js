import React, { useMemo } from "react";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Collected from "./Collected";
import Created from "./Created";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import styles from "../../styles/tabsPage.module.css";
import Favorited from "./Favorited";
import Activity from "./Activity";
import Image from "react-bootstrap/Image";
import { useWeb3React } from "@web3-react/core";


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "1900px",
  height: "10%",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "400px",
};

const Profile = () => {
  const { account } = useWeb3React();
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(false);
  // const [key, setKey] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleImageSelect = () => {
    setImage(false);
  };
  const {
    getRootProps,
    getInputProps,
    // isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject]
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  // const handleTabSumit = (newValue) => {
  //   setKey(newValue);
  // };
  const _tabsList = {
    display: "block !important",
  };
  return (
    <div>
      <Navbar />
      <div className={styles.drag_drop}>
        <>
          {image == false ? (
            <div
              className="img-fluid shadow-4"
              alt="..."
              {...getRootProps({ style })}
            >
              <input {...getInputProps()} />
              <p>Background</p>
            </div>
          ) : (
            <a onClick={handleImageSelect}>
              <aside style={thumbsContainer}>
                <div style={thumb}>{thumbs}</div>
              </aside>
            </a>
          )}
        </>
      </div>
      <p>{ account }</p>

      {/* <div className={styles.drag_drop_Profile}>
        <>
          {image == false ? (
            <div
              className={styles.imgProfile}
              alt="..."
              {...getRootProps({ style })}
            >
              <input {...getInputProps()} />
              <p>Profile</p>
            </div>
          ) : (
            <a onClick={handleImageSelect}>
              <aside style={thumbsContainer}>
                <div style={thumb}>{thumbs}</div>
              </aside>
            </a>
          )}
        </>
      </div>  */}

      <div className="data">
        <Tabs className={styles._tabsData}>
          <TabList style={_tabsList}>
            <Tab
              className={styles.tabCollect}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Collected
            </Tab>

            <Tab
              className={styles.tabCreated}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Created
            </Tab>
            <Tab
              className={styles.tabFav}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Favorited
            </Tab>
            <Tab
              className={styles.tabActive}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Activity
            </Tab>
          </TabList>

          <div>
            <input
              type="search"
              id="gsearch"
              name="gsearch"
              placeholder="Search by Name"
              className={styles.Search}
            />
            <Image className={styles.searchicon} src="searchIcon.png"></Image>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <TabPanel>
            <Collected />
          </TabPanel>
          <TabPanel>
            <Created />
          </TabPanel>
          <TabPanel>
            <Favorited />
          </TabPanel>
          <TabPanel>
            <Activity />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
