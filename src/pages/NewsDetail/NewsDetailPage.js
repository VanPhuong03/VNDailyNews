
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import API_ENDPOINTS from "../../config/api";
import axios from "axios";
import ArticleDetail from "../../components/ArticleDetail/ArticleDeatil";
import SimilarNews from "../../components/SimilarNews/SimilarNews";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const updateViewCount = useCallback(async () => {
    const viewedArticles =
      JSON.parse(localStorage.getItem("viewedArticles")) || [];

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
  console.log(inforNews.noidungchitiet)

  return (
    <div className="news-detail-page container content">
      <ArticleDetail inforNews={inforNews} tags={tags} />
      <SimilarNews newsSimilarList={newsSimilarList} />
    </div>
  );
};

export default NewsDetailPage;




