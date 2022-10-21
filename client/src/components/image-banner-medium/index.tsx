import React from "react";
import "./styles.scss";

interface ImageBannerMediumProps {
  imagePath: string;
  imageAlt: string;
  heading?: string;
  subheading?: string;
  text?: string;
}

const ImageBannerMedium = (props: ImageBannerMediumProps) => {
  const { imagePath, imageAlt, heading, subheading, text } = props;

  return (
    <div className="image-banner-medium">
      <div className="image-banner-medium__texts">
        {heading && <h1 className="image-banner-medium__heading">{heading}</h1>}
        <div className="image-banner-medium__secondary-texts">
          <div className="image-banner-medium__line" />
          <div>
            {subheading && <h3 className="image-banner-medium__subheading">{subheading}</h3>}
            {text && <p className="image-banner-medium__text">{text}</p>}
          </div>
        </div>
      </div>
      <div className="image-banner-medium__image-container">
        <img src={imagePath} alt={imageAlt} />
      </div>
    </div>
  );
};

ImageBannerMedium.defaultProps = {
  heading: "",
  subheading: "",
  text: "",
};

export default ImageBannerMedium;
