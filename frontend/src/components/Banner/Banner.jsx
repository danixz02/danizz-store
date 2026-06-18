import BannerHero from "../../assets/imagens/banner.png";
import "./Banner.css";

export  function Banner() {
 return (
   <div className="banner-container">
     <img src={BannerHero} alt="Banner" className="banner-img" />
   </div>
 );
}