import styles from "../styles/index.module.css";
import React from "react";

import Link from "next/link";
import Navbar from "../components/Navbar";
import CardsSlider from "../components/CardsSlider";
import HomeTable from "../components/HomeTable";

export default function Home() {
  return (
    <>
      <title>Yogi's Market Place</title>
      <Navbar />
      <div>
        <h1 className={styles.Explore}>Explore, collect, and sell NFTs</h1>
      </div>
      <CardsSlider />
      <HomeTable />
    </>
  );
}
