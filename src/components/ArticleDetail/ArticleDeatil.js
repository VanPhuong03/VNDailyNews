import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Article = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/news/${id}`)
      .then((response) => {
        setArticle(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the article!", error);
      });
  }, [id]);

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

      <h1>{inforNews.tiede}</h1>
      <p>{inforNews.noidungtomtat}</p>
      <img src={inforNews.anhdaidien} alt={inforNews.tiede} />

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

