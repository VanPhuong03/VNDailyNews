import React, { useState, useEffect } from "react";
import axios from "axios"; // thư viện thực hiện các yêu cầu từ HTTP
import API_ENDPOINTS from "../../config/api";
import { useParams } from "react-router-dom"; // lấy tham số từ url người dùng chọn
import NewsByTag from "../../components/NewsByTags/NewByTag";
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
      <ul className="d-flex  align-items-center ">
        <h1 className="pr-1"> {category.ten}</h1>
        {newsByTagListOfCategory.map((newslist) => (
          <li key={newslist.id} className="p-2">
            <a href={`/tags/${newslist.id}`}>{newslist.ten}</a>
          </li>
        ))}
      </ul>
      <h1>danh sách tin tức mới nhất theo danh mục</h1>
      <div className="newsNewList">
        {newsNewList.map((newslist) => (
          <div key={newslist.id}>
            <a href={`/newsdetail/${newslist.id}`}>
              <img src={newslist.anhdaidien} alt={newslist.tieude}></img>
            </a>
            <a href={`/newsdetail/${newslist.id}`}>
              <h3>{newslist.tieude}</h3>
            </a>

            <p>{newslist.noidungtomtat}</p>
          </div>
        ))}
      </div>
      <h1>danh sách tin tức có view cao nhất theo danh mục</h1>
      <div className="newsMostViewedList">
        {newsMostViewedList.map((newslist) => (
          <div key={newslist.id}>
            <a href={`/newsdetail/${newslist.id}`}>
              <img src={newslist.anhdaidien} alt={newslist.tieude}></img>
            </a>
            <h3>{newslist.tieude}</h3>
            <p>{newslist.noidungtomtat}</p>
          </div>
        ))}
      </div>
      <h1> danh sách tin tức theo thể loại của danh mục</h1>
      <div className="newsByTagListOfCategory">
        <NewsByTag newsByTagListOfCategory={newsByTagListOfCategory} />
      </div>
    </div>
  );
}

export default CategoryPage;
