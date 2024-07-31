import React from "react";
import "./NewsNewList.scss"
function Test({ newsNewList }) {
  if (newsNewList.length === 0) {
    return <div>chưa có bài viết</div>; // Không render component nếu không có bài viết
  }
  return (
      <div className="newsNewList">
        {newsNewList.map((newslist, index) => (
          <div key={newslist.id} className={`news-item news-item-${index + 1}`}>
            <a href={`/newsdetail/${newslist.id}`}>
              <img src={newslist.anhdaidien} alt={newslist.tieude}></img>
            </a>
            <div className="title">
            <a href={`/newsdetail/${newslist.id}`} className="main-title">
              {newslist.tieude}
            </a>
            </div>
            {/* <p>{newslist.noidungtomtat}</p> */}
          </div>
        ))}
      </div>
  );
}

export default Test;
