import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import productsData from '../../data/productsData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";


const FeaturedSlider = () => {

    const featuredProducts = productsData.filter(item => item.tag === 'featured-product');


    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={"auto"}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {
                featuredProducts.map((item) => {
                    const { id, images, title, finalPrice, originalPrice, path } = item;
                    const newPrice = displayMoney(finalPrice);
                    const oldPrice = displayMoney(originalPrice);

                    return (
                        <SwiperSlide key={id} className="featured_slides">
                            <div className="featured_title">{title}</div>
                            <figure className="featured_img">
                                <Link to={`${path}${id}`}>
                                    <img src={images[0]} alt="" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default FeaturedSlider;