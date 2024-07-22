import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CategoryMenu.scss";

function CategoryMenu() {
  const [category, setCategories] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh mục
    axios
      .get("http://localhost:5000/api/v1/categorys")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Có lỗi xảy ra khi gọi API:", error); // In lỗi ra console
      });
  }, []);
  //   console.log(category);
  return (
    <div className="menu">
      {category.slice(0, 10).map((category) => (
        <li key={category.id} className="nav-item">
          <Link to={`/categories/${category.id}`}>{category.ten}</Link>
          {category.tags.length > 0 && (
            <div className="tag">
              <ul className="sub-menu">
                {category.tags.map((tag) => (
                  <li key={tag.id}>
                    <Link to={`/categories/${tag.id}`}title={tag.ten} href=".">
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
  );
}

export default CategoryMenu;
