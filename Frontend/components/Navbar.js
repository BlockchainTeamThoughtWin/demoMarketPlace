import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "../styles/Navbar.module.css";
import Image from "react-bootstrap/Image";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

function NavScrollExample() {
  return (
    <Navbar className={styles.NavbarColor} expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/">
            <a>
              <Image
                className={styles.logoplace}
                src="/yogi.png"
                width="40px"
              ></Image>
            </a>
          </Link>
          <Link href="/">
            <a className={styles.Yogi}>Yogi's Marketplace</a>
          </Link>
        </Navbar.Brand>
        <input
          type="search"
          id="gsearch"
          name="gsearch"
          placeholder="Search items, Collections & Accounts"
          className={styles.Search}
        />
        <Image className={styles.searchicon} src="searchIcon.png"></Image>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className={styles.NavBarLine}>
          <Nav navbarScroll>
            <Nav.Link className={styles.Home} href="/">
              Home
            </Nav.Link>

            <Nav.Link className={styles.Create} href="Create">
              Create
            </Nav.Link>
            <Link href="/Profile">
              <a>
                <Image
                  src="/user.png"
                  width="30px"
                  height="30"
                  className={styles.IconProfile}
                ></Image>
              </a>
            </Link>

            <Link href="/Wallet">
              <a>
                <Image
                  src="/wallet.png"
                  width="30px"
                  height="30"
                  className={styles.IconWallet}
                ></Image>
              </a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
