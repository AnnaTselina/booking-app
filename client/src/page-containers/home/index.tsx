import ImageBannerBig from "../../components/image-banner-big";
import bannerImage from "../../assets/images/furniture.jpg";
import mediumBannerImage from "../../assets/images/villa.jpg";
import ImageBannerMedium from "../../components/image-banner-medium";

const HomePageContainer = () => (
  <>
    <ImageBannerBig
      backgroundImagePath={bannerImage}
      bannerHeading="Your adventure starts here"
      bannerSubheading="Book your apartment for best experience"
    />
    <ImageBannerMedium
      imagePath={mediumBannerImage}
      imageAlt="Beach view image"
      heading="Book your trip"
      subheading="Discover amazing apartments and houses all across the world."
      text="We have places from top of majestic mountains to paradise ocean beaches."
    />
  </>
);

export default HomePageContainer;
