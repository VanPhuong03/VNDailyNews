import React from "react";
import { Link } from "react-router-dom";
import "./NewsNewList.scss"
function Test({ newsNewList }) {
  if (newsNewList.length === 0) {
    return <div>chưa có bài viết</div>; // Không render component nếu không có bài viết
  }
  return (
      <div className="newsNewList">
        {newsNewList.map((newslist, index) => (
          <div key={newslist.id} className={`news-item news-item-${index + 1}`}>
            <Link to={`/newsdetail/${newslist.id}`}>
              <img src={newslist.anhdaidien} alt={newslist.tieude}></img>
            </Link>
            <div className="title">
            <Link to={`/newsdetail/${newslist.id}`} className="main-title">
              {newslist.tieude}
            </Link>
            </div>
            {/* <p>{newslist.noidungtomtat}</p> */}
          </div>
        ))}
      </div>
  );
}

export default Test;
