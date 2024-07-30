// src/components/SimilarNews.js
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SimilarNews.scss"
const SimilarNews = ({ newsSimilarList }) => {
  // props lấy dữ liệu được truyền từ component newsdetailpage
  return (
    <div className="similar-articles container ">
      <h2>Bài viết tương tự</h2>
      <div>
        {newsSimilarList.map((news) => (
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
      {/* {newsSimilarList &&
        newsSimilarList.map((similar) => (
          <div key={similar.id} className="similar-article">
            <img src={similar.anhdaidien} alt={similar.tieude} />
            <h3>{similar.tieude}</h3>
            <p>{similar.noidungtomtat}</p>
            <a href={`/newsdetail/${similar.id}`}>Đọc thêm</a>
          </div>
        ))} */}
    </div>
  );
};

export default SimilarNews;
