// import React from "react";
// import images from "@assets/imgs";
// import './index.scss'

// const ShareButton = ({ url }) => {
//   const handleShare = () => {
//     const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
//     window.open(facebookShareUrl, "_blank", "width=600,height=400");
//   };

//   return (
//     <button onClick={handleShare} className="share-button">
//     <img src={images.share} alt="."></img>
//       <span>CHIA SẺ</span>
//     </button>
//   );
// };

// export default ShareButton;


import React from "react";
import images from "@assets/imgs";
import { Dropdown } from "react-bootstrap";
import './index.scss';
import fb from "../../assets/imgs/fb.png";
import zalo from "../../assets/imgs/zalo.png";
import mess from "../../assets/imgs/mess.png"

const ShareButton = ({ url }) => {
  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "zalo":
        shareUrl = `https://zalo.me/share?url=${encodeURIComponent(url)}`;
        break;
      case "messenger":
        shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <Dropdown className="share-dropdown">
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="share-button">
        <img src={images.share} alt="share icon" />
        <span>CHIA SẺ</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="icon-social">
        <Dropdown.Item onClick={() => handleShare("facebook")} className="icon"><img src={fb} alt="facebook"></img> Facebook</Dropdown.Item>
        <Dropdown.Item onClick={() => handleShare("zalo")}  className="icon"><img src={zalo} alt="facebook"></img> Zalo</Dropdown.Item>
        <Dropdown.Item onClick={() => handleShare("messenger")}  className="icon"><img src={mess} alt="facebook"></img> Messenger</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ShareButton;


