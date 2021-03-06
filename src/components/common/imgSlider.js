import React from 'react'
import Slider from 'react-slick'

class ImgSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      adaptiveHeight: true,
      autoplay: true,
      className: 'maxHeight',
      fade: true

    }
    return (
      <div>
        <Slider {...settings}>

          {this.props.images.map((image, i) =>
            <div className="image" key={i} >
              <img src={image} />
            </div>
          )}


        </Slider>
      </div>
    )
  }
}

export default ImgSlider
