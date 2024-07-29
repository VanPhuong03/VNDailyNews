import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./index.scss"
function NewsByTag({ newsByTagListOfCategory }) {
  // console.log(newsByTagListOfCategory);
  return (
    <div className="news-by-tag">
    <h2 className="mb-3">Tin mới cập nhật</h2>
      {newsByTagListOfCategory.map((newslist) => (
        <div key={newslist.id}>
          {/* <h1>{newslist.ten}</h1> */}
          {newslist.news.map((news) => (
            <Row key={news.id} className="news-item">
              <Col lg={4} className="images">
                <a href={`/newsdetail/${news.id}`}>
                  <img src={news.anhdaidien} alt={news.tieude}></img>
                </a>
              </Col>
              <Col lg={8}>
                <div className="main-title">
                  <a href={`/newsdetail/${news.id}`}> {news.tieude}</a>
                </div>
                <p className="summary-content">{news.noidungtomtat}</p>
              </Col>
            </Row>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NewsByTag;
