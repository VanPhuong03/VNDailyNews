import logo from "@assets/imgs/index";
import "./index.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <Container className="footer">
      <Row>
        <Col lg={4} className="p-5">
          <img src={logo.logo} alt=""></img>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
