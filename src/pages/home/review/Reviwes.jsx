import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';
import { Swiper } from 'swiper/react';

const Reviwes = ({reviw}) => {

   
    const {review,userName,user_email,user_photoURL}=reviw
    return (
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8 border border-gray-100 w-full h-full">
      
      <FaQuoteLeft className="text-teal-400 text-3xl mb-4" />

      <p className=" leading-relaxed">
        {review}
      </p>

      <div className="border-t border-dashed border-teal-300 my-4"></div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-teal-800">
            <img src={user_photoURL} alt="" srcset="" />
             
        </div>

        <div>
         <h3 className="text-teal-800 font-semibold text-lg">{userName}</h3>
          <p className=" text-sm">{user_email}</p>
        </div>
      </div>

    </div>
    );
};

export default Reviwes;