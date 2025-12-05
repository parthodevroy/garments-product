import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import amazon from '../../assets/amazon.png'
import casio from '../../assets/casio.png'
import moonstar from '../../assets/moonstar.png'
import star from '../../assets/star.png'
import star_people from '../../assets/start_people.png'
import amazon_vector from '../../assets/amazon_vector.png'


const Brands = () => {
    const brandlogos=[amazon,casio,moonstar,star,star_people,amazon_vector];
    return (
        <div>
            <Swiper
             slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop={true}
        pagination={{
          clickable: true,
        }}
       
        className="mySwiper"
            
            >
                {brandlogos.map((logo,index)=>
                <SwiperSlide key={index}> 
                  <img src={logo} alt="brand logo" />

                </SwiperSlide>
                )}
                
            </Swiper>
        </div>
    );
};

export default Brands;