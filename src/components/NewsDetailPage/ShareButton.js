import React from "react";
import images from "@assets/imgs";
import './index.scss'

const ShareButton = ({ url }) => {
  const handleShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, "_blank", "width=600,height=400");
  };

  return (
    <button onClick={handleShare} className="share-button">
    <img src={images.share} alt="."></img>
      <span>CHIA SẺ</span>
    </button>
  );
};

export default ShareButton;
