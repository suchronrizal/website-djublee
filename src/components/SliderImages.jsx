import React from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const SliderImages = props => {
  const { data, widthImg, heightImg, marginLeft } = props;
  return (
    <Slider {...settings}>
      {data.product_images &&
        data.product_images.map(img => (
          <div key={img.id} className="img-product">
            <img
              src={img.link}
              alt="imgProduct"
              style={{
                width: `${widthImg}`,
                height: `${heightImg}`,
                display: 'block',
                marginLeft: `${marginLeft}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
          </div>
        ))}
    </Slider>
  );
};
export default SliderImages;
