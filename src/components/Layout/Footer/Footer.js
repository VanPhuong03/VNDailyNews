import logo from "@assets/imgs/index";
import "./index.scss";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Col lg={4} className="p-5">
          <img src={logo.logo} alt=""></img>
        </Col>
      </div>
    </div>
  );
}

export default Footer;
