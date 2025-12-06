import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';



const Brands = () => {
    const brandlogos=[];
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