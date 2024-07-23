import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import API_ENDPOINTS from "../../config/aip";
import axios from "axios";

const Article = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [article, setArticle] = useState(null);

  // Hàm kiểm tra và cập nhật lượt xem
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
        updateViewCount(); // Cập nhật lượt xem sau khi lấy dữ liệu thành công
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tìm dữ liệu bài viết", error);
      }
    };

    fetchArticle();
  }, [id, updateViewCount]); // Thêm updateViewCount vào mảng phụ thuộc

  if (!article) return <div>Loading...</div>;

  const { inforNews, tags, newsSimilarList } = article;

  return (
    <div className="article-container">
      <div className="tags">
        {tags &&
          tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.ten}
            </span>
          ))}
      </div>

      <h1>{inforNews.tieude}</h1>
      <p>{inforNews.noidungtomtat}</p>
      <img src={inforNews.anhdaidien} alt={inforNews.tieude} />

      <div className="content-details">
        {JSON.parse(inforNews.noidungchitiet).map((content, index) => {
          if (content.type === "text default") {
            return <p key={index}>{content.value}</p>;
          } else if (content.type === "image") {
            return <img key={index} src={content.src} alt={content.name} />;
          } else {
            return null;
          }
        })}
      </div>

      <div className="similar-articles">
        <h2>Bài viết tương tự</h2>
        {newsSimilarList &&
          newsSimilarList.map((similar) => (
            <div key={similar.id} className="similar-article">
              <img src={similar.anhdaidien} alt={similar.tieude} />
              <h3>{similar.tieude}</h3>
              <p>{similar.noidungtomtat}</p>
              <a href={`/newsdetail/${similar.id}`}>Đọc thêm</a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Article;
