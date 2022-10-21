import React from "react";
import "./styles.scss";

interface ImageBannerBigProps {
  backgroundImagePath: string;
  bannerHeading?: string;
  bannerSubheading?: string;
}

const ImageBannerBig = (props: ImageBannerBigProps) => {
  const { backgroundImagePath, bannerHeading, bannerSubheading } = props;

  return (
    <div className="image-banner-big" style={{ backgroundImage: `url(${backgroundImagePath})` }}>
      <div className="image-banner-big__headings">
        {bannerSubheading && <h4 className="image-banner-big__subheading">{bannerSubheading}</h4>}
        {bannerHeading && <h1 className="image-banner-big__heading">{bannerHeading}</h1>}
      </div>
    </div>
  );
};

ImageBannerBig.defaultProps = {
  bannerHeading: "",
  bannerSubheading: "",
};

export default ImageBannerBig;
