import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchArticleById, updateViewCount } from "../../services/newsService";
import ArticleDetail from "@components/NewsDetailPage/ArticleDetail/ArticleDeatil";
import SimilarNews from "@components/NewsDetailPage/SimilarNews/SimilarNews";
import LatestNewsList from "@components/LatestNewsList/LatestNewsList";
import RecommenNewsList from "@components/CategoryPage/RecommenNewsList/RecommenNewsList";
import ShareButton from "@components/NewsDetailPage/ShareButton";
import useDocumentTitle from "../../hooks/useDocumentTitle";
const NewsDetailPage = () => {
  const { id } = useParams(); // lấy ID từ url khi người dùng ấn vào bài viết
  const [article, setArticle] = useState(null);

  const updateViewCountCallback = useCallback(() => {
    updateViewCount(id);
  }, [id]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
        updateViewCountCallback();
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tìm dữ liệu bài viết", error);
      }
    };

    fetchArticle();
  }, [id, updateViewCountCallback]);

  useDocumentTitle(article ? `${article.inforNews.tiede} - Hệ thống tin tức 24h` : 'Đang tải...');

  if (!article) return <div className="container content">Loading...</div>;
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
