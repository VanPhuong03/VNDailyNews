import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API_ENDPOINTS from "@config/api";
import axios from "axios";
import ArticleDetail from "@components/NewsDetailPage/ArticleDetail/ArticleDeatil";
import SimilarNews from "@components/NewsDetailPage/SimilarNews/SimilarNews";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import RecommenNewsList from "@components/CategoryPage/RecommenNewsList/RecommenNewsList";
import ShareButton from "@components/NewsDetailPage/ShareButton";
const NewsDetailPage = () => {
  const { id } = useParams(); // lấy ID từ url khi người dùng ấn vào bài viết
  const [article, setArticle] = useState(null);

  const updateViewCount = useCallback(async () => {
    // hàm kiểm tra bài viết đã được xem chưa và cập nhật số lượt xem nếu chưa
    const viewedArticles =
      JSON.parse(localStorage.getItem("viewedArticles")) || []; // lưu id bài viết vào bộ nhớ lưu trữ cục bộ

    if (!viewedArticles.includes(id)) {
      try {
        await axios.put(`${API_ENDPOINTS.NEWS}/${id}`);
        viewedArticles.push(id);
        localStorage.setItem("viewedArticles", JSON.stringify(viewedArticles));
      } catch (error) {
        console.error("Đã xảy ra lỗi khi cập nhật số lượng lượt xem", error);
      }
    }
  }, [id]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.NEWS}/${id}`);
        setArticle(response.data.data);
        updateViewCount();
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tìm dữ liệu bài viết", error);
      }
    };

    fetchArticle();
  }, [id, updateViewCount]);

  if (!article) return <div>Loading...</div>;
  const { inforNews, tags, newsSimilarList } = article;
  const articleUrl = `${window.location.origin}/news/${id}`;

  return (
    <div className="news-detail-page container content">
      <Row>
        <Col lg={9}>
          <ArticleDetail inforNews={inforNews} tags={tags} />
          <div className="share-news">
            <ShareButton url={articleUrl} title={inforNews.title} />
          </div>
          <SimilarNews newsSimilarList={newsSimilarList} />
        </Col>
        <Col lg={3}>
          <LatestNewsList />
          <RecommenNewsList />
        </Col>
      </Row>
    </div>
  );
};

export default NewsDetailPage;
