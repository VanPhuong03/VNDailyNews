import React, { useState } from "react";
import "./index.scss";

const NewsSlider = ({ newsMostViewedList }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsMostViewedList.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + newsMostViewedList.length) % newsMostViewedList.length
    );
  };

  const displayedItems = [
    ...newsMostViewedList.slice(currentIndex, currentIndex + 4),
    ...newsMostViewedList.slice(
      0,
      (currentIndex + 4) % newsMostViewedList.length
    ),
  ].slice(0, 4);

  return (
    <div className="news-slider">
      <button onClick={prevSlide} className="slider-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="19"
          viewBox="0 0 10 19"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53711 1.6793L8.10449 -7.62939e-06L5.72205e-05 9.5L8.10449 19L9.53711 17.3207L2.86529 9.5L9.53711 1.6793Z"
            fill="#272727"
          />
        </svg>
      </button>
      <div className="newsMostViewedList">
        {displayedItems.map((newslist, index) => (
          <div
            key={newslist.id}
            className={`news-item ${index === 3 ? "news-item-partial" : ""}`}
          >
            <a href={`/newsdetail/${newslist.id}`}>
              <img src={newslist.anhdaidien} alt={newslist.tieude} />
            </a>
            <div className="title">
              <a href={`/newsdetail/${newslist.id}`} className="main-title">
                {newslist.tieude}
              </a>
            </div>
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="slider-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="19"
          viewBox="0 0 10 19"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.13578e-07 17.3207L1.43262 19L9.53705 9.5L1.43262 0L0 1.67931L6.67182 9.5L8.13578e-07 17.3207Z"
            fill="#272727"
          />
        </svg>
      </button>
    </div>
  );
};

export default NewsSlider;
