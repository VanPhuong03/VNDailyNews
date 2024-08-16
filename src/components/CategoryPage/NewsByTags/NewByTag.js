import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./index.scss";
function NewsByTag({ newsByTagListOfCategory }) {
  if (newsByTagListOfCategory.length === 0) {
    return <div>chưa có bài viết</div>;
  }
  return (
    <div className="news-by-tag mt-5">
      {newsByTagListOfCategory.map(
        (newslist) =>
          newslist.news.length > 0 && (  // thể loại nào không có bài đăng thì sẽ không hiển thị
            <div key={newslist.id} className="mt-5">
              <h2><Link to={`/tags/${newslist.id}`}>{newslist.ten}</Link></h2>
              {newslist.news.map((news) => (
                <Row key={news.id} className="news-item">
                  <Col lg={4} className="images">
                    <Link to={`/newsdetail/${news.id}`}>
                      <img src={news.anhdaidien} alt={news.tieude}></img>
                    </Link>
                  </Col>
                  <Col lg={8}>
                    <div className="main-title">
                      <Link to={`/newsdetail/${news.id}`}> {news.tieude}</Link>
                    </div>
                    <p className="summary-content">{news.noidungtomtat}</p>
                  </Col>
                </Row>
              ))}
            </div>
          )
      )}
    </div>
  );
}

export default NewsByTag;
