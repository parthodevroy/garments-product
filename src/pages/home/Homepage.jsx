import React from 'react';
import Home from './Home';
import Brands from './Brands';
import Review from './review/Review';
import ProjectOverview from './ProjectOverviwe/ProjectOverview';
import HeroSection from './HeroSection/HeroSection';
import Hero from './HeroSection/Hero';

const reviwsload=fetch("/reviews.json")
    .then(res=>res.json())
   
const Homepage = () => {
  
    return (
        <div className='w-full overflow-hidden'>
             <Hero/>
            <HeroSection/>
            <Brands/>
            {/* <Card1/> */}
            {/* <Survices/> */}
            <ProjectOverview/>
            
          
           <Review reviwsload={reviwsload}></Review>
        </div>
    );
};

export default Homepage;