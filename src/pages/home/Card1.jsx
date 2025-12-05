
import React from 'react';
import img1 from '../../assets/bookingicon.png';
import { motion } from "framer-motion"; 

const Card1 = () => {
   
    const stats = [
       {
           img:img1,
            title: "Booking Pick & Drop",
            desc:'From personal packages to business shipments — we deliver on time, every time.'        
       },
       {
           img:img1,
            title: "Cash On Delivery",
            desc:'From personal packages to business shipments — we deliver on time, every time.'
        },
       { 
           img:img1,
           title: "Delivery Hub",
           desc:'From personal packages to business shipments — we deliver on time, every time.'
        },
       {
           img:img1,
            title: "Active Volunteers",
           desc:'From personal packages to business shipments — we deliver on time, every time.'
       },
    ];

   
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 
            }
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 }, 
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100, 
                damping: 20   
            }
        },
    };

    return (
        <motion.div 
            className="max-w-4xl mx-auto my-10 grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
            
            variants={containerVariants} 
            initial="hidden" 

           
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }} 
        >
            {stats.map((stat, idx) => (
                <motion.div 
                    key={idx}
                    variants={itemVariants} 
                    className="bg-amber-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    
                    <img
                        src={stat.img}
                        alt={stat.title}
                        className="w-20 h-20 mx-auto mb-4 object-contain"
                    />
                    <p className="text-gray-800 font-semibold mt-1">{stat.title}</p>
                    <p className="text-gray-600 mt-2 text-sm">{stat.desc}</p>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default Card1;