import React, { useState, useEffect } from "react";
import axios from "axios"; // thư viện thực hiện các yêu cầu từ HTTP
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API_ENDPOINTS from "@config/api";
import { useParams } from "react-router-dom"; // lấy tham số từ url người dùng chọn
import NewsByTag from "@components/CategoryPage/NewsByTags/NewByTag";
import NewsNewList from "@components/CategoryPage/NewsNewList/NewsNewList";
import RecommenNewsList from "@components/RecommenNewsList/RecommenNewsList";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import NewsMostViewedList from "@components/CategoryPage/NewsMostViewedList/NewsMostViewedList";
import "./index.scss";
import images from "@assets/imgs";
// import API_ENDPOINTS from "../../config/aip";

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [newsNewList, setNewsNewsList] = useState([]);
  const [newsMostViewedList, setNewsMostViewedList] = useState([]);
  const [newsByTagListOfCategory, setNewsByTagListOfCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINTS.CATEGORYS}/${id}`)
      .then((response) => {
        setCategory(response.data.data.category);
        setNewsNewsList(response.data.data.newsNewList);
        setNewsMostViewedList(response.data.data.newsMostViewedList);
        setNewsByTagListOfCategory(response.data.data.newsByTagListOfCategory);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error); // In lỗi ra console
      });
  }, [id]);
  return (
    <div className="category-page content container">
      <div className="header-category">
        <ul className=" d-flex  align-items-center mb-0 ">
          <li className="icon-home d-flex align-items-center">
            <a href="/" className="icon d-flex align-items-center">
              <img src={images.home} alt="home"></img>
              <span></span>
            </a>
            <div className="title-category">
              <a href=".">{category.ten}</a>
            </div>
          </li>
          {newsByTagListOfCategory.map((newslist) => (
            <li key={newslist.id} className="tags">
              <a href={`/tags/${newslist.id}`}>{newslist.ten}</a>
            </li>
          ))}
        </ul>
      </div>
      <NewsNewList newsNewList={newsNewList} />
      <Row className="mt-5">
        <Col lg={9} md={12}>
          <NewsMostViewedList newsMostViewedList={newsMostViewedList} />
          <NewsByTag newsByTagListOfCategory={newsByTagListOfCategory} />
        </Col>
        <Col lg={3} md={12} className="content-right">
          <Row>
            <Col lg={12} md={6} className="mb-3">
              <LatestNewsList />
            </Col>
            <Col lg={12} md={6}>
              <RecommenNewsList />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CategoryPage;
