import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategory } from "../../services/newsService";
import "./CategoryMenu.scss";

function AllList() {
  const [category, setCategories] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh mục
    const getCategories = async () => {
      try {
        const data = await fetchCategory();
        setCategories(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gọi API:", error);
      }
    };
    getCategories();
  }, []);
  return (
    <div className="page-all-list">
      <div className="all-list container ">
        {category.map((category) => (
          <li key={category.id} className="nav-item">
            <Link to={`/categorys/${category.id}`}>{category.ten}</Link>
            {category.tags.length > 0 && (
              <div className="tag">
                <ul className="sub-menu">
                  {category.tags.map((tag) => (
                    <li key={tag.id}>
                      <Link to={`/tags/${tag.id}`} title={tag.ten}>
                        {tag.ten}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </div>
    </div>
  );
}

export default AllList;
