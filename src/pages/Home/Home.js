import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleList from "../../components/ArticleList/ArticleList";
function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/daboard-news?page=1&limit=10")
      .then((response) => {
        setCategories(response.data.data); // Store categories
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(categories);
  return (
    <div className="content container">
      <div>
        {categories.map((category) => (
          <div key={category.id} className="category">
            <h2>{category.ten}</h2>
            <div className="tags">
              {category.tags.map((tag) => (
                <span key={tag.id} className="tag">
                  {tag.ten}
                </span>
              ))}
            </div>
            <div className="articles">
              {category.news.map((news) => (
                <div key={news.id} className="article">
                  <h3>{news.tieude}</h3>
                  <p>{news.noidungtomtat}</p>
                  <p>
                    <strong>Ngày đăng:</strong> {news.ngaydang}
                  </p>
                  <a href={`/newsdetail/${news.id}`} >xem thêm</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        danh sách bài viết liên quan
        <ArticleList></ArticleList>
      </div>
    </div>
  );
}

export default Home;
