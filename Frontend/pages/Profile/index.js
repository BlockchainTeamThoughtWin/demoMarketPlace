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
  const [files, setFiles] = useState([]);
  const [key, setKey] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
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

  const handleTabSumit = (newValue) => {
    setKey(newValue);
  };
  const _tabsList = {
    display: "inline-flex",
  };
  const _tabs = {
    padding: "10px",
    display: "inline-block !important",
  };

  return (
    <div>
      <Navbar />
      <div>
        <div
          className="img-fluid shadow-4"
          alt="..."
          {...getRootProps({ style })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
        </div>
        <aside>
          {/* <h4>Files</h4>
        <ul>{filepath}</ul> */}
        </aside>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </div>

      <div className="data">
        <Tabs>
          <TabList style={_tabsList}>
            <Tab
              className={styles.tabCollect}
              style={_tabs}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Collected
            </Tab>
            <Tab
              className={styles.tabCreated}
              style={_tabs}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Created
            </Tab>
            <Tab
              className={styles.tabFav}
              style={_tabs}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Favorited
            </Tab>
            <Tab
              className={styles.tabActive}
              style={_tabs}
              activeStyle={{ borderBottom: "5px solid blue" }}
            >
              Activity
            </Tab>
          </TabList>
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
