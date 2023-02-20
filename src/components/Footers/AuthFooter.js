import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

function AuthFooter() {
  return (
    <>
      <footer className="footer position-absolute fixed-bottom">
        <Container>
          <nav>
            <p className="copyright text-center m-0">© 2023 Warmindo88</p>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
