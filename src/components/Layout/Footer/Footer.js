import logo from "@assets/imgs/index";
import "./index.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Row>
          <Col lg={4}>
            <div className="footer-logo">
              <img src={logo.logo} alt=""></img>
            </div>
          </Col>
          <Col lg={8} className="d-flex align-items-center justify-content-end">
            <h6 className="footer-copyright mb-0">@2024 - Phát triển bời 👨‍💻cdev, linh chii và văn phương ✅</h6>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
