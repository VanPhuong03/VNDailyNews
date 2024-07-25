import React from "react";
function NewsByTag({ newsByTagListOfCategory }) {
  console.log(newsByTagListOfCategory);
  return (
    <div>
      {newsByTagListOfCategory.map((newslist) => (
        <div key={newslist.id}>
          <h1>{newslist.ten}</h1>
          {newslist.news.map((news) => (
            <div key={news.id}>
              <a href={`/newsdetail/${news.id}`}>
                <img src={news.anhdaidien} alt={news.tieude}></img>
              </a>
              <h2>
                <a href={`/newsdetail/${news.id}`}> {news.tieude}</a>
              </h2>
              <p>{news.noidungtomtat}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default NewsByTag;
